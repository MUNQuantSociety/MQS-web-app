"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import { pastEvents, upcomingEvents} from "./eventsData"; // 

type Event = {
  title: string;
  date: string;
  description: string;
  image: string;
};

function EventCard({ event }: { event: Event }) {
  return (
    <div className="card">
      <div className="image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="details">
        <div className="center">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p><br/>{event.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(pastEvents);

  useEffect(() => {
    // Sort events by date, newest first
    const sortedEvents = [...pastEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredEvents(sortedEvents);
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
            {filteredEvents.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </section>
        </div>

        <section className="upcomingSection" style={{ fontSize: "clamp(4rem, 6vw, 6rem)" }}>
          <h1>UPCOMING EVENTS</h1>
          <h2>We're just getting started! Stay tuned for our regular events featuring guest speakers from leading financial institutions, industry panels, workshops on technical skills, and networking opportunities that will bring the world of quantitative finance straight to you.</h2>
          <div className="upcomingGrid">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="upcomingItem">
                <div className="upcomingContent">
                  <h3>{event.title}</h3>
                  <p>{event.date} <br/>{event.location}<br/><br/>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
