'use client';
import React, { useState, useEffect, useRef } from 'react';
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

const animatedTextLines = [
  "MQS is a student team at Memorial University",
  "aiming to provide a quality education in",
  "financial markets and algorithm development. ",
  "",
  "We enable students to learn the",
  "fundamentals of quantitative analysis",
  "for real world applications."
];


export default function About() {
  const [openSection, setOpenSection] = useState<SectionTitle | null>(null);
  const [showHeroText, setShowHeroText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toggleContentRef = useRef<HTMLDivElement>(null);
  const animatedTextSectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);

  if (wordRefs.current.length !== animatedTextLines.length) {
    wordRefs.current = animatedTextLines.map(line =>
      line.split(' ').map(() => null)
    );
  }

  useEffect(() => {
    const handleHeroScroll = () => {
      if (window.scrollY > 10) {
        setShowHeroText(true);
      } else {
        setShowHeroText(false);
      }
    };
    window.addEventListener('scroll', handleHeroScroll);

    const handleTextAnimationScroll = () => {
      if (!animatedTextSectionRef.current || wordRefs.current.flat().every(ref => !ref)) {
        return;
      }

      const section = animatedTextSectionRef.current;
      const { top: sectionTop, height: sectionHeight } = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let animationCompleteness = 0;
      const animationZoneStartThreshold = viewportHeight * 0.8;
      const animationZoneEndThreshold = viewportHeight * 0.1;

      if (sectionTop < animationZoneStartThreshold && sectionTop > animationZoneEndThreshold - sectionHeight) {
        if (sectionTop <= animationZoneStartThreshold && sectionTop >= animationZoneEndThreshold) {
            animationCompleteness = (animationZoneStartThreshold - sectionTop) / (animationZoneStartThreshold - animationZoneEndThreshold);
        } else if (sectionTop < animationZoneEndThreshold && sectionTop > animationZoneEndThreshold - sectionHeight) {
             animationCompleteness = 1;
        }
         animationCompleteness = Math.max(0, Math.min(1, animationCompleteness));
      } else if (sectionTop <= animationZoneEndThreshold - sectionHeight) {
        animationCompleteness = 1;
      } else {
        animationCompleteness = 0;
      }

      let totalWords = 0;
      animatedTextLines.forEach(line => {
        totalWords += line.split(' ').length;
      });

      const wordsToHighlight = Math.floor(animationCompleteness * totalWords);
      let currentWordIndex = 0;

      wordRefs.current.forEach((lineOfRefs) => {
        lineOfRefs.forEach((wordRef) => {
          if (wordRef) {
            if (currentWordIndex < wordsToHighlight) {
              wordRef.style.opacity = '1';
              wordRef.style.color = '#FFFFFF';
            } else {
              wordRef.style.opacity = '0.3';
              wordRef.style.color = '#A0A0A0';
            }
            currentWordIndex++;
          }
        });
      });
    };

    let throttleTimer: boolean | NodeJS.Timeout = false;
    const throttledTextAnimationScroll = () => {
      if (!throttleTimer) {
        throttleTimer = true;
        requestAnimationFrame(() => {
          handleTextAnimationScroll();
          throttleTimer = false;
        });
      }
    };

    window.addEventListener('scroll', throttledTextAnimationScroll);
    handleTextAnimationScroll();

    return () => {
      window.removeEventListener('scroll', handleHeroScroll);
      window.removeEventListener('scroll', throttledTextAnimationScroll);
       if (typeof throttleTimer === 'number') {
            clearTimeout(throttleTimer);
        }
    };
  }, []);

  const handleToggle = (title: SectionTitle) => {
    const isOpeningNewSection = openSection !== title;
    if (isOpeningNewSection) {
      setOpenSection(title);
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          if (toggleContentRef.current) {
            toggleContentRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    } else {
      setOpenSection(null);
    }
  };

  return (
    <div className="about-page">
      <section className="hero-section">
        <video ref={videoRef} autoPlay loop muted playsInline className="hero-video">
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

      <section className="animated-text-section" ref={animatedTextSectionRef}>
        <div className="animated-text-content">
          {animatedTextLines.map((line, lineIndex) => (
            <p key={lineIndex} className="animated-line">
              {line.split(' ').map((word, wordIndex, wordsArray) => (
                // START: Updated word and space rendering
                <React.Fragment key={wordIndex}>
                  <span
                    ref={el => {
                      if (wordRefs.current[lineIndex]) {
                        wordRefs.current[lineIndex][wordIndex] = el;
                      }
                    }}
                    className="animated-word"
                  >
                    {word}
                  </span>
                  {wordIndex < wordsArray.length - 1 && ' '} {/* Add a space if it's not the last word */}
                </React.Fragment>
                // END: Updated word and space rendering
              ))}
            </p>
          ))}
        </div>
      </section>

      <section className="sponsors-section">
        <h2>Our Sponsors</h2>
        <div className="sponsors-container">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="sponsor-logo-wrapper">
              {sponsor.link ? (
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                  <Image src={sponsor.logoUrl} alt={`${sponsor.name} logo`} fill className="sponsors-image"/>
                </a>
              ) : (
                <Image src={sponsor.logoUrl} alt={`${sponsor.name} logo`} fill className="sponsors-image"/>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="toggle-section">
        <div className="toggle-wrapper">
          <div className="toggle-container">
            <AboutUsToggleItem title="ABOUT US" setContent={() => {}} isOpen={openSection === "ABOUT US"} setOpen={handleToggle}/>
            <ProjectsToggleItem title="PROJECTS" setContent={() => {}} isOpen={openSection === "PROJECTS"} setOpen={handleToggle}/>
            <SpeakersToggleItem title="SPEAKERS & NETWORKING" setContent={() => {}} isOpen={openSection === "SPEAKERS & NETWORKING"} setOpen={handleToggle}/>
            <GetintouchToggleItem title="GET IN TOUCH!" setContent={() => {}} isOpen={openSection === "GET IN TOUCH!"} setOpen={handleToggle}/>
          </div>
          {openSection && (
            <div className="toggle-content" ref={toggleContentRef}>
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