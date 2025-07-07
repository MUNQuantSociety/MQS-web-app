"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface TeamsDropdownProps {
  onCloseMenu: () => void;
}

export default function TeamsDropdown({ onCloseMenu }: TeamsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    onCloseMenu(); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="team-btn" onClick={toggleDropdown}>
        TEAM <ChevronDown className="h-4 w-4" />
      </button>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        <Link href="/team/executives" className="dropdown-item" onClick={closeDropdown}>
          Executives
        </Link>
        <Link href="/team/website-pod" className="dropdown-item" onClick={closeDropdown}>
          Website Pod
        </Link>
        <Link href="/team/dataInfra" className="dropdown-item" onClick={closeDropdown}>
          Data & Infrastructure
        </Link>
        <Link href="/team/assetallocation" className="dropdown-item" onClick={closeDropdown}>
          Asset Allocation
        </Link>
        <Link href="/team/portfolio" className="dropdown-item" onClick={closeDropdown}>
          Portfolio
        </Link>
      </div>
    </div>
  );
}