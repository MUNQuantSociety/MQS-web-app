'use client';

import React from 'react';

const WebsitePodPage: React.FC = () => {
  return (
    <div className="website-pod-page">
      <h1 className="website-pod-title">MEET THE TEAM: Website Pod</h1>

      
      <div className="profile-container">
        <div className="profile-image" />

        <div className="profile-info">
          <h2 className="profile-name">Hameedah Salaam</h2>
          <p className="profile-role">Managing Director</p>
          <p className="profile-bio">
            Short bio or blurb of what Hameedah wants to say goes here. Something brief and meaningful.
          </p>
          <a
            href="https://www.linkedin.com/in/hameedah-salaam/"
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
          <h2 className="profile-name">Ayesha Ziauddin</h2>
          <p className="profile-role">Director</p>
          <p className="profile-bio">
            Short bio or blurb of what Ayesha wants to say goes here. Something brief and meaningful.
          </p>
          <a
            href="https://www.linkedin.com/in/ayesha-zia-b76234257/"
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

export default WebsitePodPage;