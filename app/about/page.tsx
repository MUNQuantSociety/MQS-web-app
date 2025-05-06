'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle, initialContent } from '@/components/ui/toggleItems/toggleItemTypes';
import AboutUsToggleItem from '@/components/ui/toggleItems/aboutUs';
import ProjectsToggleItem from '@/components/ui/toggleItems/Projects';
import SpeakersToggleItem from '@/components/ui/toggleItems/Speakers';
import GetintouchToggleItem from '@/components/ui/toggleItems/Getintouch';
import './style.css'; // Ensure this CSS file contains styles for .nav-link and .join-us or add them

export default function About() {
  const [openSection, setOpenSection] = useState<SectionTitle | null>(null);
  const [showHeroText, setShowHeroText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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
    // Main container div for the entire page
    <div className="about-page">

      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/video/downtown.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Centered Content over Video */}
        <div className="main-title-container">
          <h1 className="main-title">MUN QUANT SOCIETY</h1>

          
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform"
            className="nav-link join-us hero-join-button"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '1rem', marginBottom: '0.5rem' }}
          >
            JOIN US
          </a>
          {/* --- END: Added JOIN US Button --- */}

          <p className="scroll-prompt">scroll down</p>
        </div>

        {/* Bottom Text revealed on scroll */}
        <div className={`hero-bottom-text ${showHeroText ? 'visible' : ''}`}>
          <h1>Join us May 15th!</h1>
          <p>Meet like-minded driven students.</p>
        </div>

      </section> {/* End of hero-section */}

      {/* Toggle Items Section */}
      <section className="toggle-section"> {/* This section tag was previously unclosed */}
        <div className="toggle-wrapper">
          {/* Container for the clickable toggle headers */}
          <div className="toggle-container">
            <AboutUsToggleItem
              title="ABOUT US"
              setContent={() => {}}
              isOpen={openSection === "ABOUT US"}
              setOpen={handleToggle}
            />
            <ProjectsToggleItem
              title="PROJECTS"
              setContent={() => {}}
              isOpen={openSection === "PROJECTS"}
              setOpen={handleToggle}
            />
            <SpeakersToggleItem
              title="SPEAKERS & NETWORKING"
              setContent={() => {}}
              isOpen={openSection === "SPEAKERS & NETWORKING"}
              setOpen={handleToggle}
            />
            <GetintouchToggleItem
              title="GET IN TOUCH!"
              setContent={() => {}}
              isOpen={openSection === "GET IN TOUCH!"}
              setOpen={handleToggle}
            />
          </div> 
        </div> 

        {/* Conditionally rendered content area below the toggles */}
        {openSection && (
          <div className="toggle-content">
            <h2 className="toggle-content-title">{openSection}</h2>
            <div className="toggle-content-body">
              {initialContent[openSection]}
            </div>
          </div>
        )}
        
      </section> 

    </div> 
  ); 
} 