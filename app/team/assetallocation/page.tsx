"use client";
import React, { useEffect } from "react";
import { assetAllocationMembers, DIRECTOR_ROLES } from "./AAMembers";
import "../style.css";

// @ts-expect-error: Component props are not strongly typed; handled via runtime checks
function DirectorCard({ member }) {
  if (!member || !member.name || !member.role || !member.image || !member.linkedin) {
    console.warn("Missing data for DirectorCard:", member);
    return null;
  }
  return (
    <div className="teamCard">
      <div className="image">
        {/* Consider using `next/image` for optimized loading */}
        <img src={member.image} alt={member.name} />
      </div>
      <div className="details">
        <div className="center">
          <h3>{member.name}</h3>
          <p>{member.role}</p>
          <br />
          <small>{member.bio}</small>
          <br />
          {member.linkedin && member.linkedin !== "#" ? (
            <a href={member.linkedin} className="profile-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          ) : (
            <p className="no-link-text">LinkedIn profile not available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// @ts-expect-error: Component props are not strongly typed; handled via runtime checks
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
        <a href={member.linkedin} className="profile-link" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      ) : (
        <span className="no-link-text">Link not available</span>
      )}
    </div>
  );
}

export default function AssetAllocationPage() {
  const directors = assetAllocationMembers.filter((member) => DIRECTOR_ROLES.includes(member.role));
  const otherMembers = assetAllocationMembers.filter((member) => !DIRECTOR_ROLES.includes(member.role));

  useEffect(() => {
    const cards = document.querySelectorAll(".teamCard");
    if (cards.length === 0) return;

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

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="heroT" style={{ "--hero-img": `url("/MQF photos/asset_allocation.jpg")` } as React.CSSProperties}>
        <div className="heroText">Meet the Asset Allocation Team.</div>
      </div>
      <main className="mainT">
        <div className="wrapper">
          {directors.length > 0 && (
            <section className="techTeamsGrid">
              {directors.map((member) => (
                <DirectorCard key={member.name} member={member} />
              ))}
            </section>
          )}
          {otherMembers.length > 0 && (
            <section className="other-members-section">
              <h1>Team Members</h1>
              <div className="other-members-list">
                {otherMembers.map((member) => (
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
