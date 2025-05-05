"use client";

import React, { useState, useEffect } from "react";
import "../style.css";
import { link } from "fs";

const dataInfraMember = [
  {
    name: "Kelvin Fumo",
    role: "Managing Director",
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio:
    "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/headshots/kelvin.jpg"
  },
  {
    name: "Ian Anobis",
    role: "Director",
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio:
    "This is where I say something cool, witty, or vaguely profound.", 
    image: "/MQF photos/stickGuy.png"
  },
  {
    name: "Alen Jacob",
    role: "Associate",
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio:
    "This is where I say something cool, witty, or vaguely profound.", 
    image: "/MQF photos/stickGuy.png"
  },
  {
    name: "Promit Das",
    role: "Director",
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio: "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/MQF photos/stickGuy.png"
  },
  {
    name: "Utkarsh Upreti",
    role: "Director",
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio:
      "This is where I say something cool, witty, or vaguely profound.", 
    image: "/MQF photos/stickGuy.png"
  },
];


export default function EventsPage() {
  const [filteredEvents] = useState(dataInfraMember);

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
      <div className="heroDI">
        <div className="overlay"></div>
        <div className="heroText">
          <h1>Meet the Data & Infrastucture Team.</h1>
        </div>
      </div>

      <main className="main">
        <div className="container">
        <div className="events-page">
        <section className="grid">
            {filteredEvents.map((event, idx) => (
              <div key={idx} className="card">
                <div className="image">
                  <img src={event.image} alt={event.name} />
                </div>
                <div className="details">
                  <div className="center">
                    <h1>{event.name}</h1>
                    <p><strong>{event.role}</strong></p>
                    <p>{event.bio}</p>
                    <a
                    href={event.linkedin}
                    className="profile-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      LinkedIn
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
