"use client";

import React, { useState, useEffect } from "react";
import "./style.css";

interface ProfileCardProps {
  image: string;
  name: string;
  role: string;
  message: string;
  variant?: "executive" | "member";
}

function ProfileCard({
  image,
  name,
  role,
  message,
  variant = "executive",
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`profileCard ${variant} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={name} className="profileImage" />
      <div className="textContainer">
        <h2>{name}</h2>
        <h3 className="role">{role}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default function TeamsPage() {
  return (
    <div className="teamsPage">
      <h1 className="title">MEET THE EXECUTIVES!</h1>

      <div className="executiveSection">
        <ProfileCard
          image="/MQF photos/stickGuy.png"
          name="JOSH KATTAPURAM"
          role="PRESIDENT"
          message="blurbbbbbbbbbbbbbbbbbbbb"
          variant="executive"
        />
        <ProfileCard
          image="/MQF photos/stickGuy.png"
          name="Someone Else?"
          role="VICE PRESIDENT"
          message="blurbbbbbbbbbbbbbbbbbbbb"
          variant="executive"
        />
      </div>

      <div className="memberGrid">
        <ProfileCard
          image="/MQF photos/stickGuy.png"
          name="Member One"
          role="sumnBig"
          message="message"
          variant="member"
        />
        <ProfileCard
          image="/MQF photos/stickGuy.png"
          name="Member Two"
          role="sumnBig"
          message="message"
          variant="member"
        />
        <ProfileCard
          image="/MQF photos/stickGuy.png"
          name="Member Three"
          role="sumnBig"
          message="message"
          variant="member"
        />
        <ProfileCard
          image="/MQF photos/stickGuy.png"
          name="Member Four"
          role="sumnBig"
          message="message"
          variant="member"
        />
      </div>
    </div>
  );
}
