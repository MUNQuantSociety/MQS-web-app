'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle, initialContent } from '@/components/ui/toggleItems/toggleItemTypes';
import AboutUsToggleItem from '@/components/ui/toggleItems/aboutUs';
import WhatWeDoToggleItem from '@/components/ui/toggleItems/whatWeDo';
import WhoWeAreToggleItem from '@/components/ui/toggleItems/whoWeAre';
import WhereToFindUsToggleItem from '@/components/ui/toggleItems/whereToFindUs';
import './style.css'; 

export default function About() {
  const [openSection, setOpenSection] = useState<SectionTitle | null>(null);
  const [showHeroText, setShowHeroText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowHeroText(true);
      } else {
        setShowHeroText(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = (title: SectionTitle) => {
    if (openSection === title) {
      setOpenSection(null); 
    } else {
      setOpenSection(title);
    }
  };

  return (
    <div className="about-page">
     
      <section className="hero-section">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div className={`hero-overlay ${showHeroText ? 'visible' : ''}`} />

        <div className={`hero-text ${showHeroText ? 'visible' : ''}`}>
          <h1>Your Story Starts Here</h1>
          <p>Where ideas meet innovation.</p>
        </div>
      </section>

      <section className="toggle-section">
  <div className="toggle-wrapper">
    
    <div className="toggle-container">
      <AboutUsToggleItem 
        isOpen={openSection === "ABOUT US"} 
        setOpen={handleToggle} 
      />
      <WhatWeDoToggleItem 
        isOpen={openSection === "WHAT WE DO"} 
        setOpen={handleToggle} 
      />
      <WhoWeAreToggleItem 
        isOpen={openSection === "WHO WE ARE"} 
        setOpen={handleToggle} 
      />
      <WhereToFindUsToggleItem 
        isOpen={openSection === "WHERE TO FIND US"} 
        setOpen={handleToggle} 
      />
    </div>

    {openSection && (
      <div className="toggle-content">
        <h2 className="toggle-content-title">{openSection}</h2>
        <div className="toggle-content-body">
          {initialContent[openSection]}
        </div>
      </div>
    )}
    
  </div>
</section>

    </div>
  );
}
