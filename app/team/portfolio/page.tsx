"use client";
import React, { useEffect } from "react";
// Assuming styles.css is one level up from the 'portfolio-pod' directory
import "./styles.css";
import Image from 'next/image';
// --- Constants ---
const ROLES = {
  MD: "Managing Director",
  DIR: "Director",
  ASSOC: "Associate",
  // Add other roles here if needed
};

// Define which roles are considered "Directors" for card display
const DIRECTOR_ROLES = [ROLES.MD, ROLES.DIR];

// --- Data (Consider moving to a separate file e.g., data/portfolioMembers.js) ---
// Updated to use ROLES constants
const portfolioMember = [
  {
    name: "Sameer Masood",
    role: ROLES.MD,
    linkedin: "#",
    bio: "Sameer is a 4th year Economics & Computer Science Student at MUN with a strong interest in financial markets and economic research. Outside of academics, he enjoys strength training and unwinding with a good movie.",
    image: "/headshots/sameer.JPG",
  },
  {
    name: "Elliot Dicks",
    role: ROLES.MD, // Changed from Associate in original data based on image/bio? Verify role.
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Example Link
    bio: "Elliot heads a Passive Portfolio Team here at MQS",
    image: "/headshots/elliot.jpg",
  },
  {
    name: "Koushik", // Needs Full Name
    role: ROLES.DIR,
    linkedin: "#",
    bio: "Short blurb of what the person wants to say goes here. Something brief and meaningful",
    image: "/headshots/koushik.jpg",
  },
  {
    name: "Baasil Sanu",
    role: ROLES.ASSOC,
    linkedin: "#",
    bio: "Short blurb of what the person wants to say goes here. Something brief and meaningful",
    // No image passed for Associates, even if present in data
  },
  {
    name: "Fariha Mehnaz",
    role: ROLES.DIR, // Changed from Associate in original data based on image? Verify role.
    linkedin: "#",
    bio: "Fariha is a 4th year computer science student at MUN with strong interests in areas of data science and data security and encryption.",
    image: "/headshots/fariha.JPG",
  },
  {
    name: "Arooz Singh",
    role: ROLES.ASSOC,
    linkedin: "#",
    bio: "Short blurb of what the person wants to say goes here. Something brief and meaningful",
     // No image passed for Associates
  },
  {
    name: "Jake Clarke",
    role: ROLES.ASSOC,
    linkedin: "#",
    bio: "Short blurb of what the person wants to say goes here. Something brief and meaningful",
     // No image passed for Associates
  },
];


// --- Sub-Components (Reused from previous example) ---
// NOTE: These should ideally live in their own files and be imported
// e.g., import DirectorCard from '@/components/DirectorCard';

// Component for Director Cards
// @ts-expect-error - Added to avoid null error
function DirectorCard({ member }) {
  if (!member || !member.name || !member.role || !member.image || !member.linkedin) {
    console.warn("Missing data for DirectorCard:", member);
    return null;
  }

  return (
    // Apply Intersection Observer target class here
    <div className="card">
      <div className="image">
        <Image src={member.image} alt={member.name} fill/>
      </div>
      <div className="details">
        <div className="center">
          <h1>{member.name}</h1>
          <p>
            <strong>{member.role}</strong>
          </p>
          {/* Use bio only if it exists */}
          {member.bio && (
             <p>
                {/* Removed extra <br/> */}
                {member.bio}
             </p>
          )}
          {/* Link handling */}
          {member.linkedin && member.linkedin !== "#" ? (
             <a
                href={member.linkedin}
                className="profile-link" // Use the specific class for director link styling
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

// Component for Other Team Member Items
// @ts-expect-error - Added to avoid null error
function TeamMemberItem({ member }) {
   if (!member || !member.name || !member.role || !member.linkedin) {
    console.warn("Missing data for TeamMemberItem:", member);
    return null;
   }

  return (
    <div className="other-member-item">
      {/* No image rendered here */}
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      {/* Link handling */}
      {member.linkedin && member.linkedin !== "#" ? (
         <a
           href={member.linkedin}
           className="profile-link-simple" // Use the specific class for non-director links
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
// Renamed component function for clarity
export default function PortfolioPage() {
  // Filter members using constants and includes method
  const directors = portfolioMember.filter(member =>
    DIRECTOR_ROLES.includes(member.role)
  );
  const otherMembers = portfolioMember.filter(member =>
    !DIRECTOR_ROLES.includes(member.role)
  );

  // Intersection Observer for Director Cards Animation
  useEffect(() => {
    // Only proceed if there are director cards to observe
    const cards = document.querySelectorAll(".card");
    if (cards.length === 0) {
        return; // No cards found, do nothing
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

    // More robust cleanup
    return () => observer.disconnect();

  }, []); // Empty dependency array: effect runs only once after initial render

  return (
    <>
      {/* Updated hero class name to match CSS */}
      <div className="heroPortfolio">
        <div className="overlay"></div>
        <div className="heroText">
          {/* Updated Title */}
          <h1>Meet the Portfolio Team.</h1>
        </div>
      </div>

      <main className="main">
        {/* Ensure container structure matches CSS selector .main > .container */}
        <div className="container">
          {/* Changed class name for clarity, ensure CSS matches if needed */}
          <div className="portfolio-page-content">

            {/* Section for Directors using DirectorCard component */}
            {/* Only render grid if directors exist */}
            {directors.length > 0 && (
                <section className="grid">
                {directors.map((member) => (
                    <DirectorCard key={member.name} member={member} />
                ))}
                </section>
            )}


            {/* Section for Other Members using TeamMemberItem component */}
            {otherMembers.length > 0 && (
              <section className="other-members-section">
                {/* Title can be dynamic if needed */}
                <h2>Team Members</h2>
                <div className="other-members-list">
                  {otherMembers.map((member) => (
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