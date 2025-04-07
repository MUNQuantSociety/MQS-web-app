'use client';

import React from 'react';

const DataInfraPage: React.FC = () => {
  return (
    <div className="data-infra-page">
      <h1 className="data-infra-title">MEET THE TEAM: DATA & INFRASTRUCTURE</h1>

      
      <div className="profile-container">
        <div className="profile-image" />

        <div className="profile-info">
          <h2 className="profile-name">Kelvin Fumo</h2>
          <p className="profile-role">Managing Director</p>
          <p className="profile-bio">
            Short bio or blurb of what Kelvin wants to say goes here. Something brief and meaningful.
          </p>
          <a
            href="https://www.linkedin.com/in/kelvinfumo/"
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
          <h2 className="profile-name">Ian Anobis</h2>
          <p className="profile-role">Director</p>
          <p className="profile-bio">
            Short bio or blurb of what Ian wants to say goes here. Something brief and meaningful.
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

export default DataInfraPage;