"use client";
import Link from "next/link";
import TeamsDropdown from "@/app/teamsDropdown";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="logoContainer">
          <img 
            src="/logo/mqs_logo.png" 
            alt="Quant Society Logo" 
            className="logoImage"
          />
          <Link href="/" className="logoText">Quant Society</Link>
        </div>
        <nav className="nav flex space-x-6 text-white">
          <Link href="/" className="nav-link">ABOUT</Link>
          <TeamsDropdown />
          <Link href="/articles" className="nav-link">PROJECTS</Link>
          <Link href="/events" className="nav-link">EVENTS</Link>
          <Link href="/join-us" className="nav-link join-us">JOIN US</Link>
        </nav>
      </div>
    </header>
  );
}

