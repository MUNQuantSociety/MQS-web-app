export const ROLES = {
  MD: "Managing Director",
  DIR: "Director",
  ASSOC: "Associate",
  // Add other roles here if needed
};

export const DIRECTOR_ROLES = [ROLES.MD, ROLES.DIR];

// --- Data (Consider moving to a separate file e.g., data/members.js) ---
export const websiteMember = [
  {
    name: "Hameedah Salaam",
    role: ROLES.MD,
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    image: "/headshots/hameedah.JPG",
  },
  {
    name: "Ayesha Ziauddin",
    role: ROLES.DIR,
    linkedin: "https://www.linkedin.com/in/ayesha-z/",
    bio: "Short blurb of what I want to say goes here. This is where I say something cool, witty, or vaguely profound. For now, it's just placeholder text to check for overflow.",
    image: "/headshots/ayesha.jpg",
  },
  {
    name: "Zahra Khan",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/zahra-khan-516a912ba/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/zahra.jpg",
  },
  {
    name: "Isaac Dzakpata",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/isaac-dzakpata1/",
    bio: "Short blurb of what Ayesha wants to say goes here. Something brief and meaningful and ",
    // image: "/headshots/isaac.jpg",
  },
  {
    name: "Tejus Revi",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/tejusrevi/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/tejus.jpg",
  },
  {
    name: "Safwan Salman",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/mohammed-safwan-salman-24531b1b7/",
    bio: "Short blurb of what Hameedah wants to say goes here. Something brief and meaningful",
    // image: "/headshots/safwan.jpg",
  },
];