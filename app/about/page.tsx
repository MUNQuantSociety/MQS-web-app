'use client';

import React, { useEffect, useRef, useState } from 'react';
import { initialContent } from '@/components/ui/toggleItems/toggleItemTypes';
import './style.css';
import Image from 'next/image';

const animatedTextLines = [
  "MQS is a student team at Memorial University",
  "aiming to provide a quality education in",
  "financial markets and algorithm development.",
  "",
  "We enable students to learn the",
  "fundamentals of quantitative analysis",
  "for real world applications."
];

const sponsors = [
  {
    id: 'fmp',
    name: 'Financial Modelling Prep',
    logoUrl: '/logo/fmp_logo.png',
    link: 'https://financialmodelingprep.com/',
  },
  {
    id: 'cair',
    name: 'CAIR',
    logoUrl: '/logo/cair_logo.png',
    link: 'https://www.mun.ca/research/cair/',
  },
];

const sections = [
  { title: 'ABOUT US', content: initialContent['ABOUT US'], bgImage: '/about_page/intro.jpg' },
  { title: 'PROJECTS', content: initialContent['PROJECTS'], bgImage: '/about_page/toslow.png' },
  { title: 'SPEAKERS & NETWORKING', content: initialContent['SPEAKERS & NETWORKING'], bgImage: '/about_page/teams.png' },
  { title: 'GET IN TOUCH!', content: initialContent['GET IN TOUCH!'], bgImage: '/about_page/intro.jpg' },
];

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animatedTextSectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const [showBottomText, setShowBottomText] = useState(false);

  if (wordRefs.current.length !== animatedTextLines.length) {
    wordRefs.current = animatedTextLines.map(line =>
      new Array(line.split(' ').length).fill(null)
    );
  }

  useEffect(() => {
    const handleTextAnimationScroll = () => {
      if (!animatedTextSectionRef.current || wordRefs.current.flat().every(ref => !ref)) return;

      const section = animatedTextSectionRef.current;
      const { top: sectionTop, height: sectionHeight } = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let animationCompleteness = 0;
      const animationZoneStartThreshold = viewportHeight * 0.8;
      const animationZoneEndThreshold = viewportHeight * 0.1;

      if (sectionTop < animationZoneStartThreshold && sectionTop > animationZoneEndThreshold - sectionHeight) {
        animationCompleteness = (animationZoneStartThreshold - sectionTop) / (animationZoneStartThreshold - animationZoneEndThreshold);
        animationCompleteness = Math.max(0, Math.min(1, animationCompleteness));
      } else if (sectionTop <= animationZoneEndThreshold - sectionHeight) {
        animationCompleteness = 1;
      }

      let totalWords = 0;
      animatedTextLines.forEach(line => totalWords += line.split(' ').length);
      const wordsToHighlight = Math.floor(animationCompleteness * totalWords);

      let currentWordIndex = 0;
      wordRefs.current.forEach((lineOfRefs) => {
        lineOfRefs.forEach((wordRef: HTMLSpanElement | null) => {
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

    const handleHeroTextFade = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setShowBottomText(scrollY > heroHeight * 0.25);
    };

    let throttleTimer = false;
    const throttledTextAnimationScroll = () => {
      if (!throttleTimer) {
        throttleTimer = true;
        requestAnimationFrame(() => {
          handleTextAnimationScroll();
          handleHeroTextFade();
          throttleTimer = false;
        });
      }
    };

    const elements = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', throttledTextAnimationScroll);
    handleTextAnimationScroll();
    handleHeroTextFade();

    return () => {
      window.removeEventListener('scroll', throttledTextAnimationScroll);
      observer.disconnect();
    };
  }, []);

  return (
<div className="about-page">
      {/* Hero Video Section */}
      <section className="hero-section">
        <video ref={videoRef} autoPlay loop muted playsInline className="hero-video">
          <source src="/video/downtown.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="main-title-container">
          <h1 className="main-title">MUN QUANT SOCIETY</h1>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU9YmdLQMVuYfgZbiylYyQ80p9CHrWKPm2oo8xrhOGJNCJQA/viewform"
            className="nav-link join-us hero-join-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            JOIN US
          </a>
          <p className="scroll-prompt">scroll down</p>
        </div>
        <div className={`hero-bottom-text ${showBottomText ? 'visible' : ''}`}>
          <h1>SHAPING FUTURE TALENT</h1>
          <p>Quants | SDEs | Analysts</p>
        </div>
      </section>

      {/* ✨ New Gradient Blending Section */}
      <div className="hero-gradient-transition" />

      {/* Background Image Behind Content */}
      <div className="about-page-background" />
      <div className="about-page-overlay" />

      {/* Background Image Behind Content */}
      <div className="about-page-background" />
      <div className="about-page-overlay" />

      <div className="about-page-content">
        <section id="about-section" className="glass-section fade-section">
          <div className="about-hero-content"></div>
        </section>

        <section className="animated-text-section fade-section glass-section" ref={animatedTextSectionRef}>
          <div className="animated-text-content">
            {animatedTextLines.map((line, lineIndex) => (
              <p key={lineIndex} className="animated-line">
                {line.split(' ').map((word, wordIndex, wordsArray) => (
                  <React.Fragment key={wordIndex}>
                    <span
                      ref={(el: HTMLSpanElement | null) => {
                        if (wordRefs.current[lineIndex]) {
                          wordRefs.current[lineIndex][wordIndex] = el;
                        }
                      }}
                      className="animated-word"
                    >
                      {word}
                    </span>
                    {wordIndex < wordsArray.length - 1 && ' '}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </section>

        <section className="sponsors-section fade-section glass-section">
          <h2>Our Sponsors</h2>
          <div className="sponsors-container">
            {sponsors.map(s => (
              <div key={s.id} className="sponsor-logo-wrapper">
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  <Image src={s.logoUrl} alt={s.name} fill className="sponsors-image" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {sections.map(({ title, content, bgImage }, index) => (
          <section key={title} className="about-section fade-section glass-section">
            <div className={`section-content ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="section-image-wrapper">
                <Image src={bgImage} alt={title} fill className="section-image" priority />
              </div>
              <div className="section-text-wrapper">
                <h2>{title}</h2>
                <div className="scroll-text">{content}</div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
