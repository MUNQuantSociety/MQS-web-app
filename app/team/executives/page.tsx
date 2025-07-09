"use client";
import React, { useState, useEffect } from "react";
import "../style.css";
import Image from "next/image";

const executiveMember = [
  {
    name: "Joshua Kattapuram",
    role: "President",
    linkedin: "https://www.linkedin.com/in/joshua-kattapuram/ ",
    bio: "I'm a final year CS/Math student at MUN. I've worked on the trading desk at the Ontario Teacher's Pension Plan in Toronto. I also play Tennis and Piano!",
    image: "/headshots/josh.JPG",
  },
  {
    name: "Ian Anobis",
    role: "VP and Treasurer",
    linkedin: "https://www.linkedin.com ",
    bio: "My name is Ian, I am a CS student at MUN. I have a Bachelor's degree in Philosophy (Maj.) and Classics (Min.). I have served as an officer with the Royal Canadian Navy. Apart from finance my interests include world history and strategy games.",
    image: "/headshots/ian.jpg",
  },
  {
    name: "Ayesha Ziauddin",
    role: "Head of Operations",
    linkedin: "https://www.linkedin.com/in/ayesha-z/ ",
    bio: "My name is Ayesha, I am a 3rd-year CS student at MUN. I am enthusiastic about web development and enjoy reading and sleeping in my downtime.",
    image: "/headshots/ayesha.jpg",
  },
  {
    name: "Kelvin Fumo",
    role: "Managing Director - Asset Allocation",
    linkedin: "https://www.linkedin.com/in/kelvinfumo/ ",
    bio: "My name is Kelvin, I am a 5th year Business and CS student at MUN. I have experience as an Equity Analyst at the Fund and as a Data Analyst at North Atlantic. I also enjoy Basketball and Motor Racing.",
    image: "/headshots/kelvin.JPG",
  },
  {
    name: "Hameedah Salaam",
    role: "Lead Developer - Website Pod",
    linkedin: "https://www.linkedin.com/in/hameedah-salaam/ ",
    bio: "My name is Hameedah, I am a fourth year CS student interested in User experience, research and design. I also enjoy scrapbooking and learning",
    image: "/headshots/hameedah.JPG",
  },
  {
    name: "Fariha Mehnaz",
    role: "Head of Strategic Partnerships",
    linkedin: "https://www.linkedin.com/in/fariha-mehnaz/ ",
    bio: "My name is Fariha, I am a 4th year CS student at MUN with strong interests in areas of data science and data security and encryption.",
    image: "/headshots/fariha.JPG",
  },
  {
    name: "Rimsha Aziz",
    role: "Director of Marketing",
    linkedin: "https://www.linkedin.com/in/rimsha-a-117ab1294/ ",
    bio: "My name is Rimsha, I am a third year Commerce student at MUN. I like learning about all things business. When I am not studying or working, I enjoy baking and watching movies.",
    image: "/headshots/rimsha.JPG",
  },
  {
    name: "Zoya Zaidi",
    role: "Managing Director - Active Portfolio",
    linkedin: "https://www.linkedin.com/in/zoya-zaidi/ ",
    bio: "My name is Zoya, I am a third year Bachelor of commerce (co-op) student at MUN. Zoya enjoys investing in stocks and actively building her portfolio and applying financial principles in practical settings.",
    image: "/headshots/zoya.jpg",
  },
  {
    name: "Keegan Churchill",
    role: "Managing Director - Active Portfolio",
    linkedin: "https://www.linkedin.com/in/keegan-churchill-myers-409a79170/ ",
    bio: " ",
    image: "/headshots/keegan.jpg",
  },
  {
    name: "Baasil Sanu",
    role: "Managing Director - Passive Portfolio",
    linkedin: "https://www.linkedin.com/in/baasilsanu/ ",
    bio: "I am Baasil, a quantitative researcher with experience in intraday trading, simulations, and data-driven modeling in finance and fluid dynamics. I have worked on academic research and practical financial analysis.",
    image: "/headshots/baasil.jpg",
  },
  {
    name: "Nisarg Dave",
    role: "Managing Director - Passive Portfolio",
    linkedin: "https://www.linkedin.com/in/ndave310/ ",
    bio: "I have a background in neuroscience and data analytics, with research experience in agriculture, genetics, and computational biology. I am interested in behavioural finance and global markets.",
    image: "/headshots/nisarg.jpg",
  },
  {
    name: "Mpundu Chikoya",
    role: "Managing Director - Asset and Allocation",
    linkedin: "https://www.linkedin.com/in/mpundu-chikoya-bb5aa2258/ ", // Placeholder Link
    bio: "I am a 3rd year Applied Math and Economics major. I have interests in risk management and analysis. For fun, I like to bake and swim.",
    image: "/headshots/mpundu.jpg", // Placeholder Image
  },
  {
    name: "Kamal Ali",
    role: "Co-Director - Data and Infrastructure",
    linkedin: "https://www.linkedin.com/in/kamal-awad-ali/ ",
    bio: "I am a 4th-year Applied Math student with a diploma in Engineering. My primary interests lie in dynamical systems, data science, and physics-informed neural networks.",
    image: "/headshots/kamal.jpg",
  },
  {
    name: "Koushik Mote",
    role: "Co-Director - Data and Infrastructure",
    linkedin: "https://www.linkedin.com/in/koushik-mote-376980333/ ",
    bio: "I am Koushik, a fourth-year Applied Maths and CS student. I am fascinated by differential equations and chaos—both in theory and in life. I also enjoy playing pool and watching thought provoking films.",
    image: "/headshots/koushik.jpg",
  },
  {
    name: "William Church",
    role: "Director - External Relations",
    linkedin: "https://www.linkedin.com/in/church-william/ ",
    bio: "I am William, a fourth year Geography student with a passion for economic development, data analysis and visualization. At MQS, I focus on building connections with industry leaders to create opportunities for growth. ",
    image: "/headshots/church.jpg",
  },
];

export default function TeamsPage() {
  const [filteredTeams] = useState(executiveMember);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <>
      <div
        className="heroT"
        style={{ "--hero-img": `url("/MQF photos/groot.jpg")` } as React.CSSProperties}
      >
        <div className="heroText">Meet the Executives.</div>
      </div>
      <main className="mainT">
        <div className="wrapper">
          <section className="techTeamsGrid">
            {filteredTeams.map((team, idx) => (
              <div
                key={idx}
                className={`teamCard ${team.role === "President" ? "president-teamCard" : ""}`}
              >
                <div className="image">
                  <Image src={team.image} alt={team.name} fill />
                </div>
                <div className="details">
                  <div className="center">
                    <h3>{team.name}</h3>
                    <p>{team.role}</p>
                    <p>
                      <br />
                      <small>{team.bio}</small>
                    </p>
                    <br />
                    {team.linkedin && team.linkedin !== "#" ? (
                      <a
                        href={team.linkedin}
                        className="profile-link"
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
            ))}
          </section>
        </div>
      </main>
    </>
  );
}