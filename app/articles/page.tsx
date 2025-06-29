'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/types/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/get-articles');
      const data = await res.json();
      setArticles(data);
      const allTags = ['All', ...new Set<string>(data.flatMap((article: Article) => article.tags))];
      setTags(allTags);
      setFilteredArticles(data);
    };
    fetchArticles();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    const filtered = tag === 'All' ? articles : articles.filter((article) => article.tags.includes(tag));
    setFilteredArticles(filtered);
  };

  const handleReadMore = (slug: string) => {
    router.push(`/article/${slug}`);
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 py-6">
      {/* Filter Toggle Button */}
      <div className="relative z-50 mb-6">
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          initial={false}
          animate={menuOpen ? 'open' : 'closed'}
          className="flex items-center gap-2 px-4 h-10 rounded-full
                     bg-[#0f0f0f] border border-[#4af6c3] text-[#4af6c3]
                     shadow-[3px_3px_6px_rgba(0,0,0,0.6),_-3px_-3px_6px_rgba(74,246,195,0.15)]
                     hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(74,246,195,0.2)]
                     text-sm font-medium transition-all duration-300 ease-in-out active:scale-95"
        >
          <motion.div
            initial={false}
            animate={menuOpen ? 'open' : 'closed'}
            className="w-5 h-5 relative"
          >
            <motion.span
              className="absolute top-[2px] left-0 w-full h-0.5 bg-[#4af6c3] rounded origin-center"
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-[8px] left-0 w-full h-0.5 bg-[#4af6c3] rounded"
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-[14px] left-0 w-full h-0.5 bg-[#4af6c3] rounded origin-center"
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.span
            key={menuOpen ? 'close-text' : 'menu-text'}
            initial={{ opacity: 0, x: menuOpen ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: menuOpen ? -20 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {menuOpen ? 'Close' : 'Filter'}
          </motion.span>
        </motion.button>
      </div>

      {/* Tags Below Button */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="tag-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`py-1 px-3 cursor-pointer text-xs rounded-full transition-all
                    ${selectedTag === tag
                      ? 'bg-[#4af6c3] text-black'
                      : 'bg-transparent text-[#4af6c3] border border-[#4af6c3]'}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.slice(0, 20).map((article) => (
          <motion.div
            key={article.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleReadMore(article.name)}
            className="cursor-pointer bg-[#111] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#4af6c3]/30 transition-all duration-300 group"
          >
            <div className="relative w-full h-[220px] overflow-hidden">
              <Image
                src={`/article-list/${article.name}/hero.jpg`}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="py-1 px-3 bg-[#4af6c3]/10 text-[#4af6c3] text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-semibold group-hover:text-[#4af6c3] transition-colors line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-400">
                By {article.author} • {formatDate(article.date)}
              </p>
              <p className="text-gray-300 text-sm line-clamp-3">
                {article.summary}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#4af6c3] opacity-0 group-hover:opacity-100 transition-opacity">
                Tap to view more →
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
