'use client'

import { useEffect, useState } from 'react';
import {Article} from '@/types/types'

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const getSlug = async () => {
      const { slug } = await params;
      setSlug(slug);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/get-article?articleName=${slug}`);
        if (!res.ok) {
          throw new Error('Article not found');
        }

        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-black text-white">
      {article && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-sm text-gray-400 mb-4">By {article.author} - {article.date}</p>
          <div
            className="article-content text-gray-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      )}
    </div>
  );
}