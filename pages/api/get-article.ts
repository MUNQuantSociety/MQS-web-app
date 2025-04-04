import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'public', 'article-list');

const getArticleData = (slug: string) => {
  const articlePath = path.join(articlesDirectory, slug, 'article.md');

  if (!fs.existsSync(articlePath)) {
    throw new Error('Article not found');
  }

  const fileContents = fs.readFileSync(articlePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  return { ...data, content: contentHtml };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { articleName } = req.query;

  if (!articleName || Array.isArray(articleName)) {
    return res.status(400).json({ error: 'Slug is required and should be a single string' });
  }

  try {
    const article = getArticleData(articleName);

    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ error: 'Article not found ' + error});
  }
}