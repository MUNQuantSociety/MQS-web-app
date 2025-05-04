'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import TeamsDropdown from '@/app/teamsDropdown';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavLinkClick = (path: string) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* logo stuff */}
        <div className="logoContainer">
          <img src="/Quant.png" alt="Quant Society Logo" className="logoImage" />
          <Link href="/about" className="logoText">Quant Society</Link>
        </div>

        {/* hamburger */}
        <div className="mobile-menu-icon md:hidden" onClick={toggleMobileMenu} role="button" aria-label="Toggle navigation">
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-white cursor-pointer" />
          ) : (
            <Menu className="h-6 w-6 text-white cursor-pointer" />
          )}
        </div>

        {/* normal pc screen */}
        <nav ref={navRef} className="nav hidden md:flex space-x-6 text-white">
          <Link href="/about" className="nav-link">ABOUT</Link>
          <TeamsDropdown onCloseMenu={() => {}} />
          <Link href="/articles" className="nav-link">PROJECTS</Link>
          <Link href="/events" className="nav-link">EVENTS</Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform"
            className="nav-link join-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            JOIN US
          </a>
        </nav>
      </div>

      {/* adjustment for smaller screens */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="mobile-nav-open md:hidden"
        >
          <Link href="/about" className="nav-link block" onClick={() => handleNavLinkClick('/about')}>ABOUT</Link>
          <TeamsDropdown onCloseMenu={toggleMobileMenu} />
          <Link href="/articles" className="nav-link block" onClick={() => handleNavLinkClick('/articles')}>PROJECTS</Link>
          <Link href="/events" className="nav-link block" onClick={() => handleNavLinkClick('/events')}>EVENTS</Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform"
            className="nav-link join-us block"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMobileMenu}
          >
            JOIN US
          </a>
        </div>
      )}
    </header>
  );
}
