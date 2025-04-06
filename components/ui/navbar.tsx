"use client";

import Link from "next/link";
import TeamsDropdown from "@/app/teamsDropdown";

export default function Navbar() {
  return (
    <header className="header">
      <div className="logoContainer">
        <div className="logoPlaceholder"></div>
        <svg className="logoSvg" width="40" height="50" viewBox="0 0 40 50">
          <polygon points="20,0 40,35 0,35" fill="none" stroke="white" strokeWidth="2" />
          <polygon points="20,50 0,15 40,15" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        <Link href="/" className="logoText">Quant Society</Link>
      </div>
      <nav className="nav flex space-x-6 text-white">
        <Link href="/" className="nav-link">ABOUT</Link>
        <TeamsDropdown />
        <Link href="/articles" className="nav-link">PROJECTS</Link>
        <Link href="/events" className="nav-link">EVENTS</Link>
        <Link href="/join-us" className="nav-link join-us">JOIN US</Link>
      </nav>
    </header>
  );
}

