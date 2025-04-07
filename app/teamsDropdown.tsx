'use client';

import Link from 'next/link';

export default function TeamsDropdown() {
  return (
    <div className="dropdown">
      <button className="team-btn">
        TEAM
      </button>
      <div className="dropdown-content"> 
        <Link href="/team/executives" className="dropdown-item">
          Executives
        </Link>
        <Link href="/team/website-pod" className="dropdown-item">
          Website Pod
        </Link>
        <Link href="/team/dataInfra" className="dropdown-item">
          Data & Infrastructure
        </Link>
        <Link href="/team/portfolio" className="dropdown-item">
          Portfolio
        </Link>
      </div>
    </div>
  );
}