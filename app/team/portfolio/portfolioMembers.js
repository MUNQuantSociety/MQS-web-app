export const ROLES = {
  MD: "Managing Director",
  DIR: "Director",
  ASSOC: "Associate",
  // Add other roles here if needed
};

// Define which roles are considered "Directors" for card display
export const DIRECTOR_ROLES = [ROLES.MD, ROLES.DIR];

// --- Data (Consider moving to a separate file e.g., data/portfolioMembers.js) ---
// Updated to use ROLES constants
export const portfolioMember = [
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
