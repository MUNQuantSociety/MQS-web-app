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

  useEffect(() => {
   
    setSectionContent(prevContent => ({
      ...prevContent,
      "ABOUT US": initialContent["ABOUT US"],
    }));
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
      <section className="hero">
        <h1>SOMETHING COOL,</h1>
        <p>A TAG LINE FOR THE CLUB</p>
      </section>

      <section className="content flex">
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

      <section className="video-section">
        <h2>STILL CONTEMPLATING WHETHER OR NOT TO JOIN?</h2>
        <p>Let this video explain exactly why you should join...</p>
        
      </section>
    </div>
  );
}