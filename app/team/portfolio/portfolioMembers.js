export const ROLES = {
  MD_A: "Managing Director, Active Portfolio",
  MD_P: "Managing Director, Passive Portfolio",
  ASSOC: "Associate",
  // Add other roles here if needed
};

// Define which roles are considered "Directors" for card display
export const DIRECTOR_ROLES = [ROLES.MD_A, ROLES.MD_P];

// --- Data (Consider moving to a separate file e.g., data/portfolioMembers.js) ---
// Updated to use ROLES constants
export const portfolioMember = [
  {
    name: "Keegan Churchill",
    role: ROLES.MD_A,
    linkedin: "https://www.linkedin.com/in/keegan-churchill-myers-409a79170/",
    bio: " ",
    image: "/headshots/keegan.jpg",
  },
  {
    name: "Zoya Zaidi",
    role: ROLES.MD_A,
    linkedin: "https://www.linkedin.com/in/zoya-zaidi/",
    bio: "My name is Zoya, I am a third year Bachelor of commerce (co-op) student at MUN. Zoya enjoys investing in stocks and actively building her portfolio and applying financial principles in practical settings.",
    image: "/headshots/zoya.jpg",
  },
  {
    name: "Baasil Sanu", // Needs Full Name
    role: ROLES.MD_P,
    linkedin: "https://www.linkedin.com/in/baasilsanu/",
    bio: "I am Baasil, a quantitative researcher with experience in intraday trading, simulations, and data-driven modeling in finance and fluid dynamics. I have worked on academic research and practical financial analysis.",
    image: "/headshots/baasil.jpg",
  },
  {
    name: "Nisarg Dave",
    role: ROLES.MD_P,
    linkedin: "https://www.linkedin.com/in/ndave310/",
    bio: "I have a background in neuroscience and data analytics, with research experience in agriculture, genetics, and computational biology. I am interested in behavioural finance and global markets.",
    image: "/headshots/nisarg.jpg",
  },
  /*{
    name: "Baasil Sanu",
    role: ROLES.ASSOC,
    linkedin: "#",
    bio: "Short blurb of what the person wants to say goes here. Something brief and meaningful",
    // No image passed for Associates, even if present in data
  },*/
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
