"use client";

import React, { useState, useEffect } from "react";
import "../style.css";
import { link } from "fs";

const executiveMember = [
    {
      name: "Joshua Kattapuram",
      role: "President",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
      image: "/headshots/josh.png"
    },
    {
      name: "Ayesha Ziauddin",
      role: "Head of Operations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "This is where I say something cool, witty, or vaguely profound.", 
      image: "/headshots/ayesha.jpg"
    },
    {
      name: "Ducky Arora",
      role: "Head of Marketing",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "This is where I say something cool, witty, or vaguely profound.", 
        image: "/headshots/ducky.jpg"
      },
    {
      name: "Kelvin Fumo",
      role: "Head of External Relations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
        image: "/headshots/kelvin.jpg"
      },
    {
      name: "Elliot Dicks",
      role: "Another Head of External Relations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
        image: "/headshots/elliot.jpg"
      },
    {
      name: "Fariha Mehnaz",
      role: "Head of Strategic Partnerships",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "This is where I say something cool, witty, or vaguely profound.", 
        image: "/headshots/fariha.jpg"
      },
    {
      name: "Ian Anobis",
      role: "Chief Treasurer",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "This is where I say something cool, witty, or vaguely profound.", 
        image: "/MQF photos/stickGuy.png"
      },
    {
      name: "Rimsha Aziz",
      role: "Marketing Associate",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "This is where I say something cool, witty, or vaguely profound.", 
      image: "/headshots/rimsha.jpg"
    },
    {
      name: "Zoya Zaidi",
      role: "Marketing Associate",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "This is where I say something cool, witty, or vaguely profound.", 
      image: "/MQF photos/stickGuy.png"
    },
];
export default function TeamsPage() {
  const [filteredTeams] = useState(executiveMember);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => observer.observe(card));
    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);
  return (
    <>
      <div className="heroExec">
        <div className="overlay"></div>
        <div className="heroText">
          <h1>Meet the Executives.</h1>
        </div>
      </div>
      <main className="main">
        <div className="container">
        <div className="teams-page">
        <section className="grid">
            {filteredTeams.map((team, idx) => (
              <div key={idx} className={`card ${team.role === "President" ? "president-card" : ""}`}>
                <div className="image">
                  <img src={team.image} alt={team.name} />
                </div>
                <div className="details">
                  <div className="center">
                    <h1>{team.name}</h1>
                    <p><strong>{team.role}</strong></p>
                    <p><br/>{team.bio}</p>
                    <a
                    href={team.linkedin}
                    className="profile-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><br/>LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
        </div>
      </main>
    </>
  );
}
