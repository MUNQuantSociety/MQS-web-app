'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link if you plan to use it, otherwise remove if not needed for the button. Added here just in case, but the button uses <a>.
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
          <source src="/video/downtown.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="main-title-container">
          <h1 className="main-title">MUN QUANT SOCIETY</h1>

          {/* --- START: Added JOIN US Button --- */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform"
            // Using classes from Navbar for styling inspiration
            // You might need to copy or adjust styles from Navbar's CSS into './style.css'
            // Added 'hero-join-button' for potential specific overrides if needed
            className="nav-link join-us hero-join-button"
            target="_blank"
            rel="noopener noreferrer"
            // Added inline style for spacing and to ensure it behaves like a block/inline-block for margins
            style={{ display: 'inline-block', marginTop: '1rem', marginBottom: '0.5rem' }}
          >
            JOIN US
          </a>
          {/* --- END: Added JOIN US Button --- */}

          <p className="scroll-prompt">scroll down</p>
        </div>

        {/* Added conditional class based on showHeroText state */}
        <div className={`hero-bottom-text ${showHeroText ? 'visible' : ''}`}>
          <h1>Join us May 15th!</h1>
          <p>Meet like-minded driven students.</p>
        </div>

      </section>

      <section className="toggle-section">
        <div className="toggle-wrapper">
          <div className="toggle-container">
            <AboutUsToggleItem
              isOpen={openSection === "ABOUT US"}
              setOpen={handleToggle}
            />
            <ProjectsToggleItem
              isOpen={openSection === "PROJECTS"}
              setOpen={handleToggle}
            />
            <SpeakersToggleItem
              isOpen={openSection === "SPEAKERS & NETWORKING"}
              setOpen={handleToggle}
            />
            <GetintouchToggleItem
              isOpen={openSection === "GET IN TOUCH!"}
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