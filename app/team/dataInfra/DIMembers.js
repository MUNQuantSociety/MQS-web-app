export const ROLES = {
  MD_ASSET_ALLOC: "Managing Director, Asset Allocation",
  LEAD_QUANT_DEV: "Lead Quantitative Developer",
  DIR_DATA_INFRA: "Director, Data and Infrastructure",
  DIR: "Director",
  ASSOC: "Associate",
};

export const DIRECTOR_ROLES = [
  ROLES.MD_ASSET_ALLOC,
  ROLES.DIR_DATA_INFRA,
  ROLES.DIR,
  ROLES.LEAD_QUANT_DEV,
];

export const dataInfraMember = [
  {
    name: "Kelvin Fumo",
    role: ROLES.MD_ASSET_ALLOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
    bio: "Kelvin is a 5th year Business and Computer Science student at Memorial University. He has experience as an Equity Analyst at the Fund and as a Data Analyst at North Atlantic. He also enjoys Basketball and Motor Racing. ",
    image: "/headshots/kelvin.JPG",
  },
  {
    name: "Mpundu Chikoya",
    role: ROLES.MD_ASSET_ALLOC, // Treated as 'other member' below
    linkedin: "https://www.linkedin.com/in/mpundu-chikoya-bb5aa2258/",
    bio: "I am a 3rd year Applied Math and Economics major. I have interests in risk management and analysis. For fun, I like to bake and swim.",
    image: "/headshots/mpundu.jpg", // Image exists but won't be passed to TeamMemberItem
  },
  {
    name: "Koushik Mote",
    role: ROLES.DIR_DATA_INFRA,
    linkedin: "https://www.linkedin.com/in/koushik-mote-376980333/", 
    bio: "I am Koushik, a fourth-year Applied Maths and CS student. I am fascinated by differential equations and chaos—both in theory and occasionally in life. I enjoy socializing, playing pool, and watching thought provoking films.",
    image: "/headshots/koushik.jpg",
  },
  {
    name: "Kamal Ali",
    role: ROLES.DIR_DATA_INFRA,
    linkedin: "https://www.linkedin.com/in/kamal-awad-ali/",
    bio: "I am a 4th-year Applied Math student with a diploma in Engineering. My primary interests lie in dynamical systems, data science, and physics-informed neural networks.",
    image: "/headshots/kamal.jpg",
  },
  {
    name: "Simanta Ahmed",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/simanta-ahmed-855473250/", 
    // No image passed
  },
  {
    name: "Saad Shaikh",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/mohsaadshaikh/", 
  },
  {
    name: "Harshit Pawar",
    role: ROLES.ASSOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", 
  },
];
