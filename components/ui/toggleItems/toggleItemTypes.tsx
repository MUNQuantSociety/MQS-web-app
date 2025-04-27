import React from 'react';

export type SectionTitle = "ABOUT US" | "WHAT WE DO" | "WHO WE ARE" | "WHERE TO FIND US";

export interface ToggleItemProps {
  title: SectionTitle;
  setContent: (title: SectionTitle, content: React.ReactNode | null) => void;
  isOpen: boolean;
  setOpen: (title: SectionTitle) => void;
}

export const initialContent: {
  [key in SectionTitle]: React.ReactNode;
} = {
  "ABOUT US": <div>At Memorial University of Newfoundland, where over 125 clubs and societies thrive, QTF finds its niche by
  turning data into real-world impact. We bring together students from a range of disciplines to dive into the
  complex world of finance and we’ve organized ourselves into specialized teams to take it on one challenge
  at a time.<br /><br />
  Website Team: The digital geniuses who keep us looking sharp online.<br />
  External Relations: Networking ninjas who connect us with the real world of finance.
  Operations: Our backbone. keep us running like clockwork.<br />
  Marketing: Creatives who share our story.<br />
  Portfolio 1 & 2: Market movers who turn strategies into real-world returns.<br />
  Data and Infrastructure: They make sure our numbers don’t lie.<br />
  Asset Management: The money managers making every dollar count.</div>,
  "WHAT WE DO": <div>At MUN Quant Society, we’re all about learning by doing. Our members actively participate in researching,
  analyzing, and selecting assets for the portfolio, learning how to make decisions based on data and market
  trends. Through hands-on model development, and data-driven investment strategies, we empower our
  members to think critically, innovate boldly, and apply their knowledge practically.<br /><br />
  Beyond the technical work, we also create a space where members can connect, have fun and evolve. Every
  week, we meet to dive into the latest trends, work out challenging problems, and explore the intricacies of
  quantitative finance. Whether you’re mastering coding languages or delving into complex financial models,
  we ensure that you’ll walk away from each session with knowledge you can apply immediately and carry with
  you long after graduation.</div>,
  "WHO WE ARE": <div>We are a dynamic community of curious minds at Memorial University who are passionate about exploring
  the intersection of finance, technology, and data science. Born out of the need to make sense of the
  numbers, our society is all about diving into the messy, exciting world of portfolios, trading strategies, and
  financial models. <br /><br />
  Our members come from diverse backgrounds —computer science, economics, business —united by a
  shared curiosity to decode complex financial puzzles. Whether you're a finance enthusiast eager to
  understand market behavior or a coding enthusiast interested in algorithmic trading, MQT is a space to
  challenge yourself, and explore the "why" behind every market move.</div>,
  "WHERE TO FIND US": <div>You can find us in the digital realm and at these locations...</div>,
};