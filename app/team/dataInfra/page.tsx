"use client";
import React, { useEffect } from "react";
import { dataInfraMember, DIRECTOR_ROLES } from "./DIMembers"; //

import "../style.css";

// --- Sub-Components (Should be imported from shared location) ---

// Component for Director Cards (Exact same as previous example)
// @ts-expect-error - Added to avoid null error
function DirectorCard({ member }) {
  // Basic check for essential props
  if (
    !member ||
    !member.name ||
    !member.role ||
    !member.image ||
    !member.linkedin
  ) {
    console.warn("Missing data for DirectorCard:", member);
    return null;
  }
  return (
    <div className="teamCard">
      <div className="image">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="details">
        <div className="center">
          <h3>{member.name}</h3>
          <p>{member.role}</p>
<p>
                      <br />
                      <small>{member.bio}</small>
                    </p> <br />
                    {member.linkedin && member.linkedin !== "#" ? (
                      <a
                        href={member.linkedin}
                        className="profile-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    ) : (
                      <p className="no-link-text">LinkedIn profile not available</p>)}
        </div>
      </div>
    </div>
  );
}
// Component for Other Team Member Items (Exact same as previous example)
// @ts-expect-error - Added to avoid null error
function TeamMemberItem({ member }) {
  if (!member || !member.name || !member.role || !member.linkedin) {
    console.warn("Missing data for TeamMemberItem:", member);
    return null;
  }
  return (
    <div className="other-member-item">
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      {member.linkedin && member.linkedin !== "#" ? (
        <a
          href={member.linkedin}
          className="profile-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      ) : (
        <span className="no-link-text">Link not available</span>
      )}
    </div>
  );
}
// --- Main Page Component ---
// Renamed component
export default function DataInfrastructurePage() {
  // Filter members using constants
  const directors = dataInfraMember.filter((member) =>
    DIRECTOR_ROLES.includes(member.role)
  );
  // Treat everyone else as 'other members'
  const otherMembers = dataInfraMember.filter(
    (member) => !DIRECTOR_ROLES.includes(member.role)
  );

  // Intersection Observer for Director Cards Animation
  useEffect(() => {
    const cards = document.querySelectorAll(".teamCard");
    if (cards.length === 0) {
      return; // No director cards on this page? Don't set up observer.
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // observer.unobserve(entry.target); // Optional
          } else {
            // entry.target.classList.remove("visible"); // Optional
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((teamCard) => observer.observe(teamCard));

    // Cleanup
    return () => observer.disconnect();
  }, []); // Run once on mount

  return (
    <>
      {/* Use the specific hero class */}
      <div className="heroT" style={
        { "--hero-img": `url("/MQF photos/guys.jpg")`, } as React.CSSProperties
      }>
        <div className="heroText">Meet the Data & Infrastructure Team.
        </div>
      </div>
      <main className="mainT">
        {/* Standard container structure */}
        <div className="wrapper">
          {" "}
          {directors.length > 0 && (
            <section className="techTeamsGrid">
              {directors.map((member) => (
                // Pass image prop only to DirectorCard
                <DirectorCard key={member.name} member={member} />
              ))}
            </section>
          )}
          {/* Section for Other Members */}
          {otherMembers.length > 0 && (
            <section className="other-members-section">
              <h1>Team Members</h1>
              <div className="other-members-list">
                {otherMembers.map((member) => (
                  // Do NOT pass image prop here, even if data exists
                  <TeamMemberItem key={member.name} member={member} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
