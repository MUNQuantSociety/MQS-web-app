"use client";
import React, { useEffect } from "react";
import "../style.css";
import Image from 'next/image';
import { portfolioMember, DIRECTOR_ROLES } from "./portfolioMembers";
function DirectorCard({ member }: { member: typeof portfolioMember[0] }) {
  if (!member || !member.name || !member.role || !member.image || !member.linkedin) {
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
function TeamMemberItem({ member }: { member: typeof portfolioMember[0] }) {
  if (!member?.name || !member?.role) return null;
  return (
    <div className="other-member-item">
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      {member.linkedin !== "#" ? (
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

export default function PortfolioPage() {
  // Filter members using constants and includes method
  const directors = portfolioMember.filter(member =>
    DIRECTOR_ROLES.includes(member.role)
  );
  const otherMembers = portfolioMember.filter(member =>
    !DIRECTOR_ROLES.includes(member.role)
  );

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".teamCard");
    if (!cards.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div
        className="heroT"
        style={{ "--hero-img": `url("/MQF photos/group.JPG")` } as React.CSSProperties}
      >
        <div className="heroText">Meet the Portfolio Teams.</div>
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