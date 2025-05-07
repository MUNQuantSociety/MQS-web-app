'use client';
import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { SectionTitle, initialContent } from '@/components/ui/toggleItems/toggleItemTypes';
import AboutUsToggleItem from '@/components/ui/toggleItems/aboutUs';
import ProjectsToggleItem from '@/components/ui/toggleItems/Projects';
import SpeakersToggleItem from '@/components/ui/toggleItems/Speakers';
import GetintouchToggleItem from '@/components/ui/toggleItems/Getintouch';
import './style.css';
import Image from 'next/image';

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  link?: string;
}

const sponsors: Sponsor[] = [
  { id: 'fmp', name: 'Financial Modelling Prep', logoUrl: '/logo/fmp_logo.png', link: 'https://financialmodelingprep.com/' },
  { id: 'cair', name: 'CAIR', logoUrl: '/logo/cair_logo.png', link: 'https://www.mun.ca/research/cair/' },
];

export default function About() {
  const [openSection, setOpenSection] = useState<SectionTitle | null>(null);
  const [showHeroText, setShowHeroText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toggleContentRef = useRef<HTMLDivElement>(null); // Ref for the toggle content area

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
    const isOpeningNewSection = openSection !== title;

    if (isOpeningNewSection) {
      setOpenSection(title);
      // Scroll to content on mobile devices after a short delay for rendering
      // Check against the breakpoint used in CSS (768px)
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          if (toggleContentRef.current) {
            toggleContentRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start', // Aligns the top of the content with the top of the viewport
            });
          }
        }, 100); // Small delay to ensure DOM update
      }
    } else {
      setOpenSection(null); // Closing the currently open section
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
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform"
            className="nav-link join-us hero-join-button"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '1rem', marginBottom: '0.5rem' }}
          >
            JOIN US
          </a>
          <p className="scroll-prompt">scroll down</p>
        </div>
        <div className={`hero-bottom-text ${showHeroText ? 'visible' : ''}`}>
          <h1>Intro Session: May 15th!</h1>
          <p>5 PM | Bruneau Center!</p>
        </div>
      </section>

      <section className="sponsors-section">
        <h2>Our Sponsors</h2>
        <div className="sponsors-container">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="sponsor-logo-wrapper">
              {sponsor.link ? (
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                  <Image
                    src={sponsor.logoUrl}
                    alt={`${sponsor.name} logo`}
                    fill
                    className="sponsors-image"
                  />
                </a>
              ) : (
                <Image
                  src={sponsor.logoUrl}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="sponsors-image"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="toggle-section">
        <div className="toggle-wrapper">
          <div className="toggle-container">
            <AboutUsToggleItem
              title="ABOUT US"
              setContent={() => {}} // Assuming setContent is not used based on current setup
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
          {openSection && (
            <div className="toggle-content" ref={toggleContentRef}> {/* Attach the ref here */}
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