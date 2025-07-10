export const ROLES = {
 //MD_ASSET_ALLOC: "Managing Director, Asset Allocation",
  LEAD_QUANT_DEV: "Lead Quantitative Developer",
  DIR_DATA_INFRA: "Director, Data and Infrastructure",
  //DIR: "Director",
  ASSOC: "Associate",
};

export const DIRECTOR_ROLES = [
  //ROLES.MD_ASSET_ALLOC,
  ROLES.DIR_DATA_INFRA,
  //ROLES.DIR,
  ROLES.LEAD_QUANT_DEV,
];

export const dataInfraMember = [
  {
    name: "Koushik Mote",
    role: ROLES.DIR_DATA_INFRA,
    linkedin: "https://www.linkedin.com/in/koushik-mote-376980333/", 
    bio: "I am Koushik, a fourth-year Applied Maths and CS student. I am fascinated by differential equations and chaos—both in theory and in life. I also enjoy playing pool and watching thought provoking films.",
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
