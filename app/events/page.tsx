"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";
import { pastEvents, upcomingEvents} from "./eventsData"; // 
import Image from 'next/image';

type Event = {
  title: string;
  date: string;
  description: string;
  image: string;
};

function EventCard({ event }: { event: Event }) {
  return (
    <div className="eCard">
      <div className="image">
        <Image src={event.image} alt={event.title} fill/>
      </div>
      <div className="details">
        <div className="center">
          <h3>{event.title}</h3>
          <p>{event.description}<br/><br/>{event.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(pastEvents);

  useEffect(() => {
    const sortedEvents = [...pastEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredEvents(sortedEvents);
  }, []);

  return (
    <>
      <div className="eventsHero">
        <div className="eventsOverlay"></div>
        <div className="heroText">See what we&apos;re up to.
        </div>
      </div>
      <main className="mainE events-page" style={{ fontSize: "clamp(4rem, 6vw, 6rem)" }}>

        <section className="upcomingSection">
          <h1> UPCOMING EVENTS</h1>
          <h2>We&apos;re just getting started! Stay tuned for our regular events featuring guest speakers from leading financial institutions, industry panels, workshops on technical skills, and networking opportunities that will bring the world of quantitative finance straight to you.</h2>
          <div className="upcomingGrid">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="upcomingItem">
                <div className="upcomingContent">
                  <h3>{event.title}</h3>
                  <h4 style={{fontWeight: '600'}}>{event.date}<br/> {event.location}</h4>
                  <h4>{event.description}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="pastSection">
          <h1>PAST EVENTS</h1>
          <h2>Catch a glimpse of what we&apos;ve done so far...</h2>
          <div className="pastEventsGrid">
            {filteredEvents.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}