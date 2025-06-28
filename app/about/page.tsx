'use client';
import React, { useEffect, useRef, useState } from 'react';
import { initialContent } from '@/components/ui/toggleItems/toggleItemTypes';
import Image from 'next/image';
import './style.css';

const animatedTextLines = [
  'MQS is a student team at Memorial University',
  'aiming to provide a quality education in',
  'financial markets and algorithm development.',
  '',
  'We enable students to learn the',
  'fundamentals of quantitative analysis',
  'for real-world applications.',
];

const sponsors = [
  {
    id: 'fmp',
    name: 'FMP',
    logo: '/logo/fmp_logo.png',
    link: 'https://financialmodelingprep.com/',
  },
  {
    id: 'cair',
    name: 'CAIR',
    logo: '/logo/cair_logo.png',
    link: 'https://www.mun.ca/research/cair/',
  },
];

const advisors = [
  { logo: '/logo/blackrock-white.png', alt: 'BlackRock' },
  { logo: '/logo/microsoft_logo.png', alt: 'Microsoft' },
  { logo: '/logo/omers.png', alt: 'OMERS' },
  { logo: '/logo/otpp.png', alt: 'OTPP' },
  { logo: '/logo/soc_white_logo.png', alt: 'Société Générale' },
];

const panels = [
  { title: 'ABOUT US', img: '/about_page/about_bg.jpg', txt: initialContent['ABOUT US'] },
  { title: 'PROJECTS', img: '/about_page/teams.png', txt: initialContent['PROJECTS'] },
  { title: 'SPEAKERS & NETWORKING', img: '/about_page/contact.jpg', txt: initialContent['SPEAKERS & NETWORKING'] },
  { title: 'GET IN TOUCH!', img: '/about_page/web_hike.png', txt: initialContent['GET IN TOUCH!'] },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroText, setShowHeroText] = useState(false);

  // Initialize word refs
  if (wordRefs.current.length !== animatedTextLines.length) {
    wordRefs.current = animatedTextLines.map((line) => Array(line.split(' ').length).fill(null));
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setShowHeroText(true), 1000);
    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    const handler = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.75 - top) / (vh * 0.75)));

      const totalWords = wordRefs.current.flat().length;
      const revealUpto = Math.floor(progress * totalWords);

      let idx = 0;
      wordRefs.current.forEach((line) =>
        line.forEach((span) => {
          if (span) {
            const on = idx < revealUpto;
            span.style.opacity = on ? '1' : '.25';
            span.style.color = on ? '#ffffff' : '#aaa';
          }
          idx++;
        })
      );
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!mounted) return null;

  return (
    <div className="about-page">
      {/* Hero Section */}
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
          <h1>Shaping Future Talent</h1>
          <p>Quants | SDEs | Analysts</p>
        </div>
      </section>

      {/* Animated Text */}
      <section ref={sectionRef} className="animated-text-section">
        <div className="animated-text-content">
          {animatedTextLines.map((line, li) => (
            <p key={li} className="animated-line">
              {line.split(' ').map((word, wi, arr) => (
                <React.Fragment key={wi}>
                  <span
                    ref={(el: HTMLSpanElement | null) => {
                      wordRefs.current[li][wi] = el;
                    }}
                    className="animated-word"
                  >
                    {word}
                  </span>
                  {wi < arr.length - 1 && ' '}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="sponsors-section">
        <h2>Our Sponsors</h2>
        <div className="sponsors-container">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              className="sponsor-logo-wrapper"
              href={sponsor.link}
              target="_blank"
              rel="noreferrer"
            >
              <div style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="sponsors-image"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Advisors */}
      <section className="marquee-section">
        <h2>Our Advisors Have Worked At</h2>
        <div className="marquee-container fadeout-horizontal">
          <div className="marquee-track">
            {/* Generate 4 copies of the advisors array for seamless loop */}
            {[...advisors, ...advisors, ...advisors, ...advisors].map((advisor, index) => (
              <div key={index} className="marquee-item">
                <div className="marquee-content">
                  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      src={advisor.logo}
                      alt={advisor.alt}
                      width={120}
                      height={60}
                      className="marquee-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Panels */}
      {panels.map(({ title, txt, img }) => (
        <section
          key={title}
          className="full-image-section"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="overlay-content">
            <h2>{title}</h2>
            <div className="panel-text">{txt}</div>
          </div>
        </section>
      ))}
    </div>
  );
}
