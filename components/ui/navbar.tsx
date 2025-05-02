"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import TeamsDropdown from "@/app/teamsDropdown";
import { Menu, X } from 'lucide-react'; 
import { useRouter } from 'next/navigation'; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter(); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (path: string) => {
    toggleMobileMenu(); 
    router.push(path); 
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <div className="logoContainer">
          <img
            src="/Quant.png"
            alt="Quant Society Logo"
            className="logoImage"
          />
          <Link href="/about" className="logoText">Quant Society</Link>
        </div>

        {/* hamburger */}
        <div className="mobile-menu-icon md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-white cursor-pointer" /> 
          ) : (
            <Menu className="h-6 w-6 text-white cursor-pointer" /> 
          )}
        </div>

        
        <nav
          ref={navRef}
          className={`nav hidden md:flex space-x-6 text-white`}
        >
          <Link href="/about" className="nav-link">ABOUT</Link>
          <TeamsDropdown onCloseMenu={toggleMobileMenu} />
          <Link href="/articles" className="nav-link">PROJECTS</Link>
          <Link href="/events" className="nav-link">EVENTS</Link>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform" className="nav-link join-us" target="_blank" rel="noopener noreferrer"
          >JOIN US</Link>
        </nav>

      </div>

      {/* open hamburger */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-content md:hidden bg-black/80 backdrop-blur-md absolute top-full left-0 w-full py-4 flex flex-col items-center gap-4">
          <Link href="/about" className="nav-link block" onClick={() => handleNavLinkClick('/about')}>ABOUT</Link>
          <TeamsDropdown onCloseMenu={toggleMobileMenu} />
          <Link href="/articles" className="nav-link block" onClick={() => handleNavLinkClick('/articles')}>PROJECTS</Link>
          <Link href="/events" className="nav-link block" onClick={() => handleNavLinkClick('/events')}>EVENTS</Link>
          <Link href="/join-us" className="nav-link join-us block" onClick={() => handleNavLinkClick('/join-us')}>JOIN US</Link>
        </div>
      )}

    </header>
  );
}

