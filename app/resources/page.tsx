'use client'

import { useEffect, useState } from 'react';

type Resource = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string; // URL to Google Drive or other resource
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    // For now, using static data, replace with fetch('/api/get-resources') if available
    const data: Resource[] = [
      {
        id: '1',
        title: 'Budgeting Spreadsheet',
        description: 'A simple spreadsheet to manage your monthly budget.',
        tags: ['Budgeting', 'Spreadsheet'],
        link: 'https://drive.google.com/your-budget-sheet-link',
      },
      {
        id: '2',
        title: 'Investment Basics PDF',
        description: 'PDF guide to basic investment principles.',
        tags: ['Investing', 'Guide'],
        link: 'https://drive.google.com/your-investment-guide-link',
      },
      {
        id: '3',
        title: 'Compound Interest Calculator',
        description: 'Online calculator to understand compound interest.',
        tags: ['Calculator', 'Tools'],
        link: 'https://www.example.com/compound-interest-calculator',
      },
    ];

    setResources(data);
    setFilteredResources(data);
    setTags(['All', ...Array.from(new Set(data.flatMap(r => r.tags)))]);
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(r => r.tags.includes(tag)));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white w-screen">
      {/* Tag filter */}
      <div className="flex space-x-4 overflow-x-auto mb-6">
        {tags.map(tag => (
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

      {/* Resources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-gray-900 p-4 rounded-lg shadow space-y-2">
            <h2 className="text-2xl font-semibold">{resource.title}</h2>
            <p className="text-gray-300">{resource.description}</p>
            <div className="flex space-x-2">
              {resource.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 border border-[#4af6c3] rounded text-[#4af6c3]">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Open Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

function FormattedDate({ dateString }: { dateString: string }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (!dateString) return;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formatted = new Date(dateString).toLocaleDateString('en-GB', options);
    setFormattedDate(formatted);
  }, [dateString]);

  return <>{formattedDate}</>;
}




