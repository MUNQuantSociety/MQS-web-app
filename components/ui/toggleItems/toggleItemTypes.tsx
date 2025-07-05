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
  We strongly believe in the talent nurtured here in Newfoundland, and prepare talented students for roles in Trading, Capital markets, and Computer Science.<br />
  <br /></div>,
  "PROJECTS": <div>At MQS, we&apos;re all about learning by doing so everyone works on real projects around the year.<br /><br />
  We&apos;re one of the few student societies around the world to have built our own systematic paper trading infrastructure to trade in real time!</div>,
  "SPEAKERS & NETWORKING": <div>We&apos;ve hosted speakers with experiences at top firms such as Blackrock & Ontario Teacher&apos;s Pension Plan in the past. We strongly believe in industry exposure. <br /><br />
  Our members come from diverse backgrounds building practical skills together. We also host socials and networking events twice a semester!</div>,
  "GET IN TOUCH!": <div>You can click the join us button at the top of the page.<br /><br /> Email us at munquantsociety@gmail.com</div>,
};