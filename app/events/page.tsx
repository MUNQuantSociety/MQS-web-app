"use client";

import React, { useState, useEffect } from "react";
import "./style.css";

const events = [
  {
    title: "Social Mixer",
    date: "February 27, 2025",
    description:
      "For our first-ever mixer of the year, MQF hosted a cozy evening of community-building in collaboration with the Economics Society and The Fund. Members connected over coffee and insightful conversations and engaged with peers outside the classroom to set the tone for the term ahead.",
    image: "MQF photos/first.jpg"
  },
  {
    title: "Casual Dinner",
    date: "April 4, 2025",
    description:
      "A low-key evening where we traded stock data for menus and portfolios for shared appetizers. No name tags, no pressure — just quant enthusiasts sharing laughs and stories. Turns out, we bond over more than data.",
    image: "MQF photos/lemon.jpg"
  },
  {
    title: "LinkedIn Headshots Day",
    date: "April 7, 2025",
    description:
      "Our final gathering of the semester was the ideal send-off before exams and summer internships, where members had the opportunity to capture high-quality professional headshots. Smiles, snacks, and a few bonus group shots made it the perfect celebration for everything we accomplished over the semester.",
    image: "MQF photos/linkedIn.jpg"
  },
  {
    title: "Bonus Gathering",
    date: "April 7, 2025",
    description:
      "More laughs and memories as we wrapped up the term with a surprise pizza drop and casual game night.",
    image: "MQF photos/random.jpg"
  },
];

const upcomingEvents = [
  {
    title: "Event 1",
    date: "May 15, 2025",
    location: "MUN Campus",
    description: "Blurb blurb blurb",
  },
  {
    title: "Event 2",
    date: "June 3, 2025",
    location: "MUN Campus",
    description: "Blurb blurb blurb",
  },
  {
    title: "Event 3",
    date: "June 3, 2025",
    location: "MUN Campus",
    description: "Blurb blurb blurb",
  },
];

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(events);

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
          <h1>See what we're up to.</h1>
        </div>
      </div>

      <main className="main">
        <div className="container">
          <section className="grid">
            {filteredEvents.map((event, idx) => (
              <div key={idx} className="card">
                <div className="image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="details">
                  <div className="center">
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        <section className="upcomingSection">
          <h2>UPCOMING EVENTS</h2>
          <p>We are just getting started! Stay tuned for our regular events featuring guest speakers from leading financial institutions, industry panels, workshops on technical skills, and networking opportunities that will bring the world of quantitative finance straight to you.</p>
          <div className="upcomingGrid">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="upcomingItem">
                <div className="upcomingContent">
                  <h3>{event.title}</h3>
                  <h4><strong>Date:</strong> {event.date}</h4>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
