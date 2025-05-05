import React from 'react';

export type SectionTitle = "ABOUT US" | "PROJECTS" | "SPEAKERS & NETWORKING" | "GET IN TOUCH!";

export interface ToggleItemProps {
  title: SectionTitle;
  setContent: (title: SectionTitle, content: React.ReactNode | null) => void;
  isOpen: boolean;
  setOpen: (title: SectionTitle) => void;
}

export const initialContent: {
  [key in SectionTitle]: React.ReactNode;
} = {
  "ABOUT US": <div>We're Memorial University's premier Quantitative Finance & Trading Society<br /><br />
  We're incredibly passionate, driven and friendly!<br />
  Do you want to add to your resume? Network with industry professionals? Learn how to manage your own portfolio?<br />
  You're at the right spot<br /></div>,
  "PROJECTS": <div>At MUN Quant Society, we’re all about learning by doing. Through model development, and data-driven investment strategies, we empower our
  members to learn and apply their knowledge practically.<br /><br />
  We manage a fund, work on projects & research papers to ensure that you’ll have practical projects you can add to your resume!</div>,
  "SPEAKERS & NETWORKING": <div>We've hosted speakers from top firms such as Blackrock & OMERS in the past. We're strongly believe in industry exposure. <br /><br />
  Our members come from diverse backgrounds —computer science, economics, business —united by a
  shared curiosity to decode complex financial puzzles. Joining our society allows you to create lasting friendships with a diverse audience. We host socials and networking events twice a semester!</div>,
  "GET IN TOUCH!": <div>You can click the join us button at the top of the page.<br /><br /> Email us at munquantsociety@gmail.com</div>,
};