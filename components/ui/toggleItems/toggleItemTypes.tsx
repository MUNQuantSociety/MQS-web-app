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
  "ABOUT US": <div>We are blah blah blah</div>,
  "WHAT WE DO": <div>This is what we do blah blah blah</div>,
  "WHO WE ARE": <div>We are a group of talented individuals.</div>,
  "WHERE TO FIND US": <div>You can find us in the digital realm and at these locations...</div>,
};