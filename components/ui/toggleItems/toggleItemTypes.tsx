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
  "ABOUT US": <div>We&apos;re Memorial University&apos;s premier Quantitative Finance & Trading Society<br /><br />
  We strongly believe in the talent nurtured here in Newfoundland, and prepare talented students for roles in Trading, Capital markets, and Computer Science leveraging cutting edge resources all built in-house.<br />
  <br /><br />
  Want to develop your skills in a challenging and competitive environment? You&apos;re at the right spot. <br /></div>,
  "PROJECTS": <div>At MUN Quant Society, we&apos;re all about learning by doing. Through model development, and data-driven investment strategies, we empower our
  members to learn and apply their knowledge practically.<br /><br />
  We manage a fund, work on projects & research papers to ensure that you&apos;ll have practical projects you can add to your resume!</div>,
  "SPEAKERS & NETWORKING": <div>We&apos;ve hosted speakers from top firms such as Blackrock & OMERS in the past. We strongly believe in industry exposure. <br /><br />
  Our members come from diverse backgrounds —computer science, economics, business —united by a
  shared curiosity to decode complex financial puzzles. Joining our society allows you to create lasting friendships with a diverse audience. We host socials and networking events twice a semester!</div>,
  "GET IN TOUCH!": <div>You can click the join us button at the top of the page.<br /><br /> Email us at munquantsociety@gmail.com</div>,
};