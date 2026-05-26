'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Apply theme
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full hover:bg-gray-700 transition relative group"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-300" />
      )}

      {/* Tooltip */}
      <span className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
        {dark ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
}
