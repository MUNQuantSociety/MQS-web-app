'use client';
import React, { useState, useEffect, useRef } from 'react'; // Keep useEffect if needed for other things
import { SectionTitle, initialContent } from '@/components/ui/toggleItems/toggleItemTypes';
import AboutUsToggleItem from '@/components/ui/toggleItems/aboutUs';
import ProjectsToggleItem from '@/components/ui/toggleItems/Projects';
import SpeakersToggleItem from '@/components/ui/toggleItems/Speakers';
import GetintouchToggleItem from '@/components/ui/toggleItems/Getintouch';
import './style.css';

export default function About() {
  const [openSection, setOpenSection] = useState<SectionTitle | null>(null);
  // showHeroText state and useEffect remain removed
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggle = (title: SectionTitle) => {
    if (openSection === title) {
      setOpenSection(null);
    } else {
      setOpenSection(title);
    }
  };

  return (
    <div className="about-page">

      <section className="hero-section"> {/* Ensure this has position: relative */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Container for the main title and scroll prompt - Stays centered */}
        <div className="main-title-container">
          <h1 className="main-title">MUN Quant Society</h1>
          <p className="scroll-prompt">scroll down</p>
        </div>

        {/* "Join us..." text - Now positioned at the bottom of the hero section */}
        <div className="hero-bottom-text"> {/* New class name */}
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