"use client";
import React, { useEffect } from "react";
import "../style.css";
import { websiteMember, DIRECTOR_ROLES } from "./websiteMembers";

function DirectorCard({ member }: { member: typeof websiteMember[0] }) {
  if (!member?.name || !member?.role || !member?.image || !member?.linkedin) {
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
          {member.bio && <p><small>{member.bio}</small></p>}
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
            <p className="no-link-text">LinkedIn profile not available</p>
          )}
        </div>
      </div>
    </div>
  );
}
function TeamMemberItem({ member }: { member: typeof websiteMember[0] }) {
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
export default function WebsitePodPage() {
  const directors = websiteMember.filter((member) =>
    DIRECTOR_ROLES.includes(member.role)
  );
  const otherMembers = websiteMember.filter(
    (member) => !DIRECTOR_ROLES.includes(member.role)
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
        style={{ "--hero-img": `url("/MQF photos/website.JPG")` } as React.CSSProperties}
      >
        <div className="heroText">Meet the Website Pod.</div>
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
