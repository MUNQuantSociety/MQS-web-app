"use client";
import React, { useState, useEffect } from "react";
import "../style.css";
import { link } from "fs";
const websiteMember = [
  {
    name: "Hameedah Salaam",
    role: "Managing Director",
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio:
      "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    image: "/headshots/hameedah.jpg"
  },
  {
    name: "Ayesha Ziauddin",
    role: "Director",
    linkedin: "#",
    bio:
      "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/headshots/ayesha.jpg"
  },
  {
    name: "Zahra Khan",
    role: "Associate",
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio:
      "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
      image: "/headshots/zahra.jpg"
    },
  {
    name: "Isaac Dzakpata",
    role: "Associate",
    linkedin: "#",
    bio:
      "Short blurb of what Ayesha wants to say goes here. Something brief and meaningful and ",
      image: "/headshots/isaac.jpg"
    },      
  {
  name: "Tejus Revi",
  role: "Associate",
  linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
  bio:
    "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    image: "/headshots/tejus.jpg"
  },
  {
    name: "Safwan Salman",
    role: "Associate",
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio:
      "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
      image: "/headshots/safwan.jpg"
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
      <div className="heroWebsite">
        <div className="overlay"></div>
        <div className="heroText">
          <h1>Meet the Website Pod.</h1>
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
                    <p><br/>{event.bio}</p>
                    <a
                    href={event.linkedin}
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
