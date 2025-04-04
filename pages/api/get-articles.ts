import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

import { Article } from '@/types/types';
const articlesDirectory = path.join(process.cwd(), 'public', 'article-list');

const getSortedArticles = (): Article[] => {
  const folderNames = fs.readdirSync(articlesDirectory);
  const articles: Article[] = [];

  folderNames.forEach((name) => {
    const folderPath = path.join(articlesDirectory, name);
    if (fs.statSync(folderPath).isDirectory()) {
      const articlePath = path.join(folderPath, 'article.md');
      if (fs.existsSync(articlePath)) {
        const fileContents = fs.readFileSync(articlePath, 'utf8');
        const { data, content } = matter(fileContents);

        if (data.title && data.author && data.date && data.tags && data.summary) {
          articles.push({ ...data, content, name } as Article);
        }
      }
    }
  });

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const articles = getSortedArticles();
  res.status(200).json(articles);
}