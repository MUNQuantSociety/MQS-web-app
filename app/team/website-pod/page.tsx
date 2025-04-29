"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";
import { link } from "fs";

const websiteMember = [
  {
    name: "Hameedah Salaam",
    role: "Managing Director",
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio:
      "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    image: "/MQF photos/stickGuy.png"
  },
  {
    name: "Ayesha Ziauddin",
    role: "Director",
    linkedin: "#",
    bio:
      "Short blurb of what Ayesha wants to say goes here. Something brief and meaningful",
    image: "/MQF photos/stickGuy.png"
  },
];


export default function EventsPage() {
  const [filteredEvents] = useState(websiteMember);

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
      <div className="hero">
        <div className="overlay"></div>
        <div className="heroText">
          <h1>Meet the Website Pod Team.</h1>
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
