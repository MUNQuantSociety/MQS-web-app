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
    bio: "My name is Hameedah, I am a fourth year CS student who is interested in User experience, research and design. In my free time I like to find new dad jokes. Did you know “dogs can’t operate MRI machines but catscan!",
    image: "/headshots/hameedah.JPG",
  },
  {
    name: "Ayesha Ziauddin",
    role: ROLES.DIR,
    linkedin: "https://www.linkedin.com/in/ayesha-z/",
    bio: "My name is Ayesha, I am a 3rd-year CS student at MUN. I am enthusiastic about web development and enjoy reading and sleeping in my downtime.",
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