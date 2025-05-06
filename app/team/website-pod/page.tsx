"use client";
import React, { useState, useEffect } from "react";
import "./styles.css"; // Corrected import path

// --- Constants ---
const ROLES = {
  MD: "Managing Director",
  DIR: "Director",
  ASSOC: "Associate",
  // Add other roles here if needed
};

const DIRECTOR_ROLES = [ROLES.MD, ROLES.DIR];

// --- Data (Consider moving to a separate file e.g., data/members.js) ---
const websiteMember = [
  {
    name: "Hameedah Salaam",
    role: ROLES.MD,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    image: "/headshots/hameedah.jpg",
  },
  {
    name: "Ayesha Ziauddin",
    role: ROLES.DIR,
    linkedin: "#",
    bio: "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/headshots/ayesha.jpg",
  },
  {
    name: "Zahra Khan",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/zahra.jpg", // Image was present in original data? Included for consistency if needed, otherwise remove.
  },
  {
    name: "Isaac Dzakpata",
    role: ROLES.ASSOC,
    linkedin: "#",
    bio: "Short blurb of what Ayesha wants to say goes here. Something brief and meaningful and ",
    // image: "/headshots/isaac.jpg", // Image was present in original data?
  },
  {
    name: "Tejus Revi",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/tejus.jpg", // Image was present in original data?
  },
  {
    name: "Safwan Salman",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/safwan.jpg", // Image was present in original data?
  },
];

// --- Sub-Components ---

// Component for Director Cards
function DirectorCard({ member }) {
  // Basic check for essential props
  if (!member || !member.name || !member.role || !member.image || !member.bio || !member.linkedin) {
    // Handle missing data, e.g., return null or a placeholder
    console.warn("Missing data for DirectorCard:", member);
    return null;
  }

  return (
    <div className="card"> {/* Intersection observer targets this element */}
      <div className="image">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="details">
        <div className="center">
          <h1>{member.name}</h1>
          <p>
            <strong>{member.role}</strong>
          </p>
          {/* Added check for bio existence */}
          {member.bio && (
             <p>
                <br />
                {member.bio}
             </p>
          )}
          {/* Added check and handling for '#' link */}
          {member.linkedin && member.linkedin !== "#" ? (
             <a
                href={member.linkedin}
                className="profile-link"
                target="_blank"
                rel="noopener noreferrer"
              >
               <br />
               LinkedIn
             </a>
          ) : (
            // Optionally render something else if link is '#' or missing
            <p className="no-link-text"><br/>LinkedIn profile not available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Component for Other Team Member Items
function TeamMemberItem({ member }) {
   // Basic check for essential props
   if (!member || !member.name || !member.role || !member.linkedin) {
    // Handle missing data, e.g., return null or a placeholder
    console.warn("Missing data for TeamMemberItem:", member);
    return null;
   }

  return (
    <div className="other-member-item">
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      {/* Added check and handling for '#' link */}
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
        // Optionally render something else if link is '#' or missing
        <span className="no-link-text">Link not available</span>
      )}
    </div>
  );
}


// --- Main Page Component ---
export default function EventsPage() {
  // Filter members using constants and includes method
  const directors = websiteMember.filter(member =>
    DIRECTOR_ROLES.includes(member.role)
  );
  const otherMembers = websiteMember.filter(member =>
    !DIRECTOR_ROLES.includes(member.role)
  );

  // Intersection Observer for Director Cards Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // observer.unobserve(entry.target); // Optional: Stop observing once visible
          } else {
            // entry.target.classList.remove("visible"); // Optional: Re-animate when scrolling out
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => observer.observe(card));

    // Cleanup function
    return () => {
      cards.forEach((card) => {
        if (card) { // Check if card still exists before unobserving
           observer.unobserve(card);
        }
      });
    };
  }, []); // Empty dependency array: effect runs only once after initial render

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
            {/* Section for Directors using DirectorCard component */}
            <section className="grid">
              {directors.map((member) => (
                // Use member.name or another unique ID if available for key
                <DirectorCard key={member.name} member={member} />
              ))}
            </section>

            {/* Section for Other Members using TeamMemberItem component */}
            {otherMembers.length > 0 && (
              <section className="other-members-section">
                <h2>Team Members</h2>
                <div className="other-members-list">
                  {otherMembers.map((member) => (
                     // Use member.name or another unique ID if available for key
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