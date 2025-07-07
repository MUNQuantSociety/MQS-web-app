export const ROLES = {
    MD_ASSET_ALLOC: "Managing Director",
    DIR: "Director",
    ASSOC: "Associate",
  };
  
  export const DIRECTOR_ROLES = [
    ROLES.MD_ASSET_ALLOC,
    ROLES.DIR,
  ];
  
  export const assetAllocationMembers = [
    {
        name: "Kelvin Fumo",
        role: ROLES.MD_ASSET_ALLOC,
        linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
        bio: "Kelvin is a 5th year Business and Computer Science student at Memorial University. He has experience as an Equity Analyst at the Fund and as a Data Analyst at North Atlantic. He also enjoys Basketball and Motor Racing. ",
        image: "/headshots/kelvin.JPG",
      },
      {
        name: "Mpundu Chikoya",
        role: ROLES.DIR, // Treated as 'other member' below
        linkedin: "https://www.linkedin.com/in/mpundu-chikoya-bb5aa2258/",
        bio: "I am a 3rd year Applied Math and Economics major. I have interests in risk management and analysis. For fun, I like to bake and swim.",
        image: "/headshots/mpundu.jpg", // Image exists but won't be passed to TeamMemberItem
      }
  ];
  