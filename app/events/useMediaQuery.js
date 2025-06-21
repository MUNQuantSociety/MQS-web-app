"use client";

import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set the initial value
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Update the value on resize
    const listener = () => {
      setMatches(media.matches);
    };
    
    window.addEventListener('resize', listener);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}