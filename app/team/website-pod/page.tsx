"use client";
import React, { useEffect } from "react";
import "./styles.css"; // Corrected import path
import Image from 'next/image'; // Ensure Image is imported

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
    // image: "/headshots/zahra.jpg",
  },
  {
    name: "Isaac Dzakpata",
    role: ROLES.ASSOC,
    linkedin: "#",
    bio: "Short blurb of what Ayesha wants to say goes here. Something brief and meaningful and ",
    // image: "/headshots/isaac.jpg",
  },
  {
    name: "Tejus Revi",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/tejus.jpg",
  },
  {
    name: "Safwan Salman",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/safwan.jpg",
  },
];

// --- Sub-Components ---

// Component for Director Cards
// @ts-expect-error - Added to avoid null error
function DirectorCard({ member }) {
  if (!member || !member.name || !member.role || !member.image || !member.bio || !member.linkedin) {
    console.warn("Missing data for DirectorCard:", member);
    return null;
  }

  return (
    <div className="card">
      {/* Ensure parent div for Image has relative positioning if needed */}
      <div className="image relative h-60"> {/* Example: Added relative and height */}
        <Image src={member.image} alt={member.name} fill className="object-cover"/> {/* Added object-cover */}
      </div>
      <div className="details">
        <div className="center">
          <h1>{member.name}</h1>
          <p>
            <strong>{member.role}</strong>
          </p>
          {member.bio && (
             <p>
                <br />
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
               <br />
               LinkedIn
             </a>
          ) : (
            <p className="no-link-text"><br/>LinkedIn profile not available</p>
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
export default function EventsPage() {
  const directors = websiteMember.filter(member =>
    DIRECTOR_ROLES.includes(member.role)
  );
  const otherMembers = websiteMember.filter(member =>
    !DIRECTOR_ROLES.includes(member.role)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            // entry.target.classList.remove("visible"); // Optional
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => {
        if (card) {
           observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <>
      {/* === MODIFIED HERO SECTION START === */}
      {/* Add 'relative' to establish positioning context for the 'fill' Image */}
      {/* Make sure .heroWebsite in your CSS defines a height */}
      <div className="heroWebsite relative">

        {/* The Next.js Image Component for the background */}
        <Image
          // --- IMPORTANT: Replace with the ACTUAL path to your hero image ---
          src="/path/to/your/heroWebsite-image.jpg"
          alt="Background showing [describe image content briefly]" // Add descriptive alt text
          fill // Tells the image to fill its parent container
          className="object-cover z-[-1]" // 'object-cover' ensures it covers the area without distortion
                                          // 'z-[-1]' places it behind other content in this div
          priority // Optional: Add 'priority' if this image is critical for LCP (Largest Contentful Paint)
        />

        {/* Existing overlay and text - they will now render on top of the Image */}
        <div className="overlay"></div>
        <div className="heroText">
          <h1>Meet the Website Pod.</h1>
        </div>
      </div>
      {/* === MODIFIED HERO SECTION END === */}


      <main className="main">
        <div className="container">
          <div className="events-page">
            <section className="grid">
              {directors.map((member) => (
                <DirectorCard key={member.name} member={member} />
              ))}
            </section>

            {otherMembers.length > 0 && (
              <section className="other-members-section">
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