'use client';

import React from 'react';

const PortfolioPage: React.FC = () => {
  return (
    <div className="portfolio-page">
      <h1 className="portfolio-title">MEET THE TEAM: Portfolio</h1>

      
      <div className="profile-container">
        <div className="profile-image" />

        <div className="profile-info">
          <h2 className="profile-name">NAME</h2>
          <p className="profile-role">Managing Director</p>
          <p className="profile-bio">
            Short bio or blurb of what The person wants to say goes here. Something brief and meaningful.
          </p>
          <a
            href="#"
            className="profile-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      
      <div className="profile-container profile-container--spaced">
        <div className="profile-image" />

        <div className="profile-info">
          <h2 className="profile-name">NAME</h2>
          <p className="profile-role">Director</p>
          <p className="profile-bio">
            Short bio or blurb of what the person wants to say goes here. Something brief and meaningful.
          </p>
          <a
            href="#"
            className="profile-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;