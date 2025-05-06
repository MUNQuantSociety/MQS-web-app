'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Article } from '@/types/types';
import Image from 'next/image';
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<string[]>([]); // Store unique tags
  const [selectedTag, setSelectedTag] = useState<string>('All'); // Default to "All"
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/get-articles');
      const data = await res.json();
      setArticles(data);

      const allTags = ['All', ...new Set<string>(data.flatMap((article: Article) => article.tags as string[]))];
      setTags(allTags);

      // Initially show all articles
      setFilteredArticles(data);
    };

    fetchArticles();
  }, []);

  // Handle tag click to filter articles
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      setFilteredArticles(articles); // Show all articles if "All" is selected
    } else {
      const filtered = articles.filter((article) =>
        article.tags.includes(tag)
      );
      setFilteredArticles(filtered);
    }
  };

  const handleReadMore = (slug: string) => {
    router.push(`/article/${slug}`);
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white w-screen">
      {/* Tag filter banner */}
      <div className="flex space-x-4 overflow-x-auto mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`py-1 px-3 cursor-pointer text-xs rounded-full 
              ${selectedTag === tag ? 'bg-[#4af6c3] text-black' : 'bg-transparent text-[#4af6c3] border border-[#4af6c3]'}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.slice(0, 20).map((article) => (
          <div key={article.name} className="flex flex-col space-y-4 pb-4">
            <div>
            <div className="w-[400px] h-[250px] overflow-hidden">
              <Image
                src={`/article-list/${article.name}/hero.jpg`}
                alt={article.title}
                width={400} // Add width prop
                height={250} // Add height prop
                className="object-cover" // Keep object-cover for aspect ratio handling
                // You can likely remove max/min width/height classes here now
              />
            </div>
            </div>
            <div className="flex space-x-2 p-1 mb-1">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="py-1 px-2 border-1 border-[#4af6c3] text-[#4af6c3] text-xs cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="p-1">
              <h2 className="text-3xl font-bold line-clamp-2">{article.title}</h2>
              <p className="text-sm text-gray-400">By {article.author} • {formatDate(article.date)}</p>
              <p className="text-gray-300 pt-2 line-clamp-3">{article.summary}</p>
              <button
                onClick={() => handleReadMore(article.name)}
                className="text-blue-500 hover:underline cursor-pointer pt-1"
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}