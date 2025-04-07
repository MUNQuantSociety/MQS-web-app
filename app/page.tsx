'use client';
import React, { useState, useRef, useEffect } from 'react';

type SectionTitle = "ABOUT US" | "WHAT WE DO" | "WHO WE ARE" | "WHERE TO FIND US";

interface ToggleItemProps {
  title: SectionTitle;
  setContent: (title: SectionTitle, content: React.ReactNode | null) => void;
  isOpen: boolean;
  setOpen: (title: SectionTitle) => void;
}

const initialContent: {
  [key in SectionTitle]: React.ReactNode;
} = {
  "ABOUT US": <div>We are blah blah blah</div>,
  "WHAT WE DO": <div>This is what we do blah blah blah</div>,
  "WHO WE ARE": <div>We are a group of talented individuals.</div>,
  "WHERE TO FIND US": <div>You can find us in the digital realm and at these locations...</div>,
};

function ToggleItem({ title, isOpen, setOpen }: ToggleItemProps) {
  const toggleRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen(title); 
  };

  useEffect(() => {
    if (toggleRef.current) {
      toggleRef.current.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(-90deg)';
    }
  }, [isOpen]);

  return (
    <div className="toggle-item flex items-center mb-2 border rounded h-20 overflow-hidden">
      <div
        className="toggle-button-container w-full h-full p-4 cursor-pointer flex items-center justify-between"
        onClick={toggleOpen}
      >
        <span className="truncate">{title}</span>
        <span
          className="toggle-icon text-2xl font-bold transition-transform duration-300"
          ref={toggleRef}
        >
          {isOpen ? ' - ' : ' + '}
        </span>
      </div>
    </div>
  );
}

export default function About() {
  const [openSection, setOpenSection] = useState<SectionTitle | null>("ABOUT US");
  const [sectionContent, setSectionContent] = useState<{ [key in SectionTitle]: React.ReactNode | null }>({
    "ABOUT US": null, 
    "WHAT WE DO": null,
    "WHO WE ARE": null,
    "WHERE TO FIND US": null,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setSectionContent(prevContent => ({
      ...prevContent,
      "ABOUT US": initialContent["ABOUT US"],
    }));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setContent = (title: SectionTitle, content: React.ReactNode | null) => {
    setSectionContent(prevContent => ({
      ...prevContent,
      [title]: content,
    }));
  };

  const handleSectionClick = (title: SectionTitle) => {
    if (title === "ABOUT US") {
      setOpenSection("ABOUT US");
    } else if (openSection !== title) {
      setOpenSection(title);
    } else {
      setOpenSection("ABOUT US"); 
    }
  };

  return (
    <div className="page-content">

      <section className="relative h-screen w-full">

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        <div className={`absolute inset-0 bg-black transition-opacity duration-500 z-10 ${
          isScrolled ? 'opacity-50' : 'opacity-20'
        }`} />


        <div className={`relative z-20 h-full flex flex-col justify-center items-center text-white transition-all duration-700 ${
          isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-4">SOMETHING COOL,</h1>
          <p className="text-2xl md:text-3xl">A TAG LINE FOR THE CLUB</p>
        </div>


        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>


      <section className="content flex mt-20"> 
        <div className="toggle-list w-1/4 pr-4">
          <ToggleItem
            title="ABOUT US"
            setContent={setContent}
            isOpen={openSection === "ABOUT US"}
            setOpen={() => handleSectionClick("ABOUT US")}
          />
          <ToggleItem
            title="WHAT WE DO"
            setContent={setContent}
            isOpen={openSection === "WHAT WE DO"}
            setOpen={() => handleSectionClick("WHAT WE DO")}
          />
          <ToggleItem
            title="WHO WE ARE"
            setContent={setContent}
            isOpen={openSection === "WHO WE ARE"}
            setOpen={() => handleSectionClick("WHO WE ARE")}
          />
          <ToggleItem
            title="WHERE TO FIND US"
            setContent={setContent}
            isOpen={openSection === "WHERE TO FIND US"}
            setOpen={() => handleSectionClick("WHERE TO FIND US")}
          />
        </div>

        <div className="about-text w-3/4">
          <h2>{openSection || "ABOUT US"}</h2>
          {sectionContent[openSection || "ABOUT US"]}
        </div>
      </section>

      <section className="video-section py-20">
        <h2>STILL CONTEMPLATING WHETHER OR NOT TO JOIN?</h2>
        <p>Let this video explain exactly why you should join...</p>
      </section>
    </div>
  );
}