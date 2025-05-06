"use client";

import React, { useState, useEffect } from "react";
import "../style.css";
import Image from 'next/image';

const executiveMember = [
    {
      name: "Joshua Kattapuram",
      role: "President",
      linkedin: "https://www.linkedin.com/in/joshua-kattapuram/",
      bio:
      "Josh is a fourth year CS/Math stduent at Memorial. He has experience working on the trading desk at the Ontario Teacher's Pension Plan in Toronto. He also likes to play Tennis and the Piano!",
      image: "/headshots/josh.jpg"
    },
    {
      name: "Ayesha Ziauddin",
      role: "Head of Operations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "Ayesha is a 3rd-year CS student at Memorial University. She's enthusiastic about web development and enjoys reading and sleeping in her downtime.", 
      image: "/headshots/ayesha.jpg"
    },
    {
      name: "Elliot Dicks",
      role: "Portfolio 1 Managing Director, External Relations",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "Elliot heads a Passive Portfolio Team here at MQS",
        image: "/headshots/elliot.jpg"
      },
      {
        name: "Kelvin Fumo",
        role: "Managing Director - Asset Allocation",
        linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
        bio:
          "Kelvin is a 5th year Business and Computer Science student at Memorial University. He has experience as an Equity Analyst at the Fund and as a Data Analyst at North Atlantic. He also enjoys Basketball and Motor Racing.",
          image: "/headshots/kelvin.jpg"
        },
  {
          name: "Hameedah Salaam",
          role: "Lead Developer - Website Pod",
          linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
          bio:
            "My name is Hameedah, I am a fourth year CS student who is interested in User experience, research and design. In my free time I like to find new dad jokes. Did you know “dogs can’t operate MRI machines but catscan!”", 
            image: "/headshots/hameedah.jpg"
          },
    {
        name: "Fariha Mehnaz",
        role: "Head of Strategic Partnerships",
        linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
        bio:
          "Fariha is a 4th year computer science student at MUN with strong interests in areas of data science and data security and encryption.", 
          image: "/headshots/fariha.jpg"
        },
    {
          name: "Tejus Revi",
          role: "Lead Quantitative Developer",
          linkedin: "https://www.linkedin.com/in/tejusrevi/",
          bio:
            "Tejus is a computer science graduate from Memorial University with experience in building infrastructure to support big data analysis, particularly in the scientific research space. Outside of work, he enjoys strength athletics and sketching.", 
            image: "/headshots/tejus.jpg"
          },
    {
      name: "Ian Anobis",
      role: "Treasurer",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
        "Ian is our Compliance officer and treasurer.", 
        image: "/MQF photos/stickGuy.png"
      },
      {
        name: "Koushik Mote",
        role: "Director",
        linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/", // Placeholder Link
        bio: "Koushik is a 4th year computer science student and Math student interested in Quant Finance.",
        image: "/MQF photos/koushik.png", // Placeholder Image
      },
    {
      name: "Rimsha Aziz",
      role: "Director of Marketing",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "Rimsha is a third year Commerce student at Memorial University. She likes learning about all things business. When she's not studying or working, she enjoys baking and watching movies.", 
      image: "/headshots/rimsha.jpg"
    },
    {
      name: "Sameer Masood",
      role: "Portfolio 2 Managing Director",
      linkedin: "https://www.linkedin.com/in/kelvin-fumo-1b0a4a1b3/",
      bio:
      "Sameer is a 4th year Economics & Computer Science Student at MUN with a strong interest in financial markets and economic research. Outside of academics, he enjoys strength training and unwinding with a good movie", 
      image: "/headshots/sameer.jpg"
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
      <div className="heroExec">
        <div className="overlay"></div>
        <div className="heroText">
          <h1>Meet the Executives.</h1>
        </div>
      </div>
      <main className="main">
        <div className="container">
        <div className="teams-page">
        <section className="grid">
            {filteredTeams.map((team, idx) => (
              <div key={idx} className={`card ${team.role === "President" ? "president-card" : ""}`}>
                <div className="image">
                  <Image src={team.image} alt={team.name} fill/>
                </div>
                <div className="details">
                  <div className="center">
                    <h1>{team.name}</h1>
                    <p><strong>{team.role}</strong></p>
                    <p><br/>{team.bio}</p>
                    <a
                    href={team.linkedin}
                    className="profile-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><br/>LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
        </div>
      </main>
    </>
  );
}
