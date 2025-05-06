"use client";
import React, { useState, useEffect } from "react";
// Assuming styles.css is one level up
import "./styles.css";

// --- Constants ---
// Define all specific roles present in the data
const ROLES = {
  MD_ASSET_ALLOC: "Managing Director, Asset Allocation",
  LEAD_QUANT_DEV: "Lead Quantitative Developer",
  DIR_ASSET_ALLOC: "Director, Asset Allocation",
  DIR: "Director",
  ASSOC: "Associate",
};

const DIRECTOR_ROLES = [ROLES.MD_ASSET_ALLOC, ROLES.DIR_ASSET_ALLOC, ROLES.DIR, ROLES.LEAD_QUANT_DEV];

// --- Data ---
// Consider moving to data/dataInfraMembers.js
const dataInfraMember = [
  {
    name: "Kelvin Fumo",
    role: ROLES.MD_ASSET_ALLOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio: "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/headshots/kelvin.jpg",
  },
  {
    name: "Tejus Revi",
    role: ROLES.LEAD_QUANT_DEV, // Treated as 'other member' below
    linkedin: "https://www.linkedin.com/in/tejusrevi/",
    bio: "Tejus is a computer science graduate from Memorial University with experience in building infrastructure to support big data analysis, particularly in the scientific research space. Outside of work, he enjoys strength athletics and sketching.",
    image: "/headshots/tejus.jpg", // Image exists but won't be passed to TeamMemberItem
  },
  {
    name: "Ian Anobis",
    role: ROLES.DIR_ASSET_ALLOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Placeholder Link
    bio: "This is where I say something cool, witty, or vaguely profound.",
    image: "/MQF photos/stickGuy.png", // Placeholder Image
  },
  {
    name: "Alen Jacob",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Placeholder Link
    bio: "This is where I say something cool, witty, or vaguely profound.",
    // No image passed
  },
  {
    name: "Promit Das",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Placeholder Link
    bio: "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/MQF photos/stickGuy.png", // Placeholder Image
  },
  {
    name: "Utkarsh Upreti",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Placeholder Link
    bio: "This is where I say something cool, witty, or vaguely profound.",
    image: "/MQF photos/stickGuy.png", // Placeholder Image
  },
];


// --- Sub-Components (Should be imported from shared location) ---

// Component for Director Cards (Exact same as previous example)
function DirectorCard({ member }) {
    // Basic check for essential props
  if (!member || !member.name || !member.role || !member.image || !member.linkedin) {
    console.warn("Missing data for DirectorCard:", member);
    return null;
  }

  return (
    <div className="card">
      <div className="image">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="details">
        <div className="center">
          <h1>{member.name}</h1>
          <p>
            <strong>{member.role}</strong>
          </p>
          {member.bio && (
             <p>
                {member.bio}
             </p>
          )}
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
            <p className="no-link-text">LinkedIn profile not available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Component for Other Team Member Items (Exact same as previous example)
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
           className="profile-link-simple"
           target="_blank"
           rel="noopener noreferrer"
         >
           LinkedIn Profile
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
  const directors = dataInfraMember.filter(member =>
    DIRECTOR_ROLES.includes(member.role)
  );
  // Treat everyone else as 'other members'
  const otherMembers = dataInfraMember.filter(member =>
    !DIRECTOR_ROLES.includes(member.role)
  );

  // Intersection Observer for Director Cards Animation
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
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

    cards.forEach((card) => observer.observe(card));

    // Cleanup
    return () => observer.disconnect();

  }, []); // Run once on mount

  return (
    <>
      {/* Use the specific hero class */}
      <div className="heroDI">
        <div className="overlay"></div>
        <div className="heroText">
          {/* Updated title */}
          <h1>Meet the Data & Infrastructure Team.</h1>
        </div>
      </div>

      <main className="main">
        {/* Standard container structure */}
        <div className="container">
          <div className="data-infra-page-content"> {/* Optional specific wrapper */}

            {/* Section for Directors */}
            {directors.length > 0 && (
                <section className="grid">
                {directors.map((member) => (
                    // Pass image prop only to DirectorCard
                    <DirectorCard key={member.name} member={member} />
                ))}
                </section>
            )}

            {/* Section for Other Members */}
            {otherMembers.length > 0 && (
              <section className="other-members-section">
                <h2>Team Members</h2>
                <div className="other-members-list">
                  {otherMembers.map((member) => (
                    // Do NOT pass image prop here, even if data exists
                    <TeamMemberItem key={member.name} member={member} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}