"use client";

import React, { useState, useEffect } from "react";
import "../style.css";
import { link } from "fs";

const executiveMember = [
    {
      name: "Joshua Kattapuram",
      role: "President",
      linkedin: "https://www.linkedin.com/in/joshua-kattapuram/",
      bio:
      "Josh is a fourth year CS/Math stduent at Memorial. He has experience working on the trading desk at the Ontario Teacher's Pension Plan in Toronto. He also likes to play Tennis and the Piano!",
      image: "/headshots/josh.jpg"
    },
    {
      name: "Ayesha Ziauddin",
      role: "Head of Operations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "Ayesha, is a third year Computer Science student at MUN. She is the Operations Lead at MQS.", 
      image: "/headshots/ayesha.jpg"
    },
    {
      name: "Elliot Dicks",
      role: "Portfolio 1 Managing Director, External Relations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "Elliot heads a Passive Portfolio Team here at MQS",
        image: "/headshots/elliot.jpg"
      },
      {
        name: "Kelvin Fumo",
        role: "Managing Director - Asset Allocation",
        linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
        bio:
          "Kelvin leads the Asset Allocation Team at MQS.",
          image: "/headshots/kelvin.jpg"
        },
  {
          name: "Hameedah Salaam",
          role: "Lead Developer - Website Pod",
          linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
          bio:
            "Hameedah leads the website pod, and manages a team of over 4 people.", 
            image: "/headshots/hameedah.jpg"
          },
    {
        name: "Fariha Mehnaz",
        role: "Head of Strategic Partnerships",
        linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
        bio:
          "Fariha Mehnaz is the Director of Strategic Partnerships at MQS.", 
          image: "/headshots/fariha.jpg"
        },
    {
          name: "Tejus Revi",
          role: "Lead Quantitative Developer",
          linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
          bio:
            "Tejus Revi Leads the Infrastructure and Data Team at MQS", 
            image: "/headshots/tejus.jpg"
          },
    {
      name: "Ian Anobis",
      role: "Treasurer",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "Ian is our Compliance officer and treasurer.", 
        image: "/MQF photos/stickGuy.png"
      },
    {
      name: "Rimsha Aziz",
      role: "Director of Marketing",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "This is where I say something cool, witty, or vaguely profound.", 
      image: "/headshots/rimsha.jpg"
    },
    {
      name: "Sameer Masood",
      role: "Portfolio 2 Managing Director",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "Sameer is a managing director and leads Portfolio 2.", 
      image: "/headshots/sameer.jpg"
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
