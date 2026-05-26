"use client";
import React, { useState, useEffect } from "react";
import styles from "./teams.module.css";
import Image from "next/image";

import { executives } from "./exec-descr";

export default function TeamsPage() {
  const [filteredTeams] = useState(executives);

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
    <div className={styles.teamsPage}>
      <div
        className="heroT"
        style={
          {
            "--hero-img": `url("/MQF photos/groot.jpg")`,
          } as React.CSSProperties
        }
      >
        <div className={styles.heroText}>Meet the Executives.</div>
      </div>

      <main className="mainT">
        <div className="wrapper">
          <section className="techTeamsGrid">
            {filteredTeams.map((team, idx) => (
              <div
                key={idx}
                className={`teamCard ${
                  team.role === "President" ? "president-teamCard" : ""
                }`}
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
                      <small className={team.bio.length > 300 ? "long-bio" : ""}>
                        {team.bio}
                      </small>
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
    </div>
  );
}
