export const ROLES = {
  MD_ASSET_ALLOC: "Managing Director, Asset Allocation",
  LEAD_QUANT_DEV: "Lead Quantitative Developer",
  DIR_ASSET_ALLOC: "Director, Asset Allocation",
  DIR: "Director",
  ASSOC: "Associate",
};

export const DIRECTOR_ROLES = [
  ROLES.MD_ASSET_ALLOC,
  ROLES.DIR_ASSET_ALLOC,
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
    name: "Koushik Mote",
    role: ROLES.DIR_ASSET_ALLOC,
    linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Placeholder Link
    bio: "Koushik is a 4th year computer science student and Math student interested in Quant Finance.",
    image: "/headshots/koushik.jpg", // Placeholder Image
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
