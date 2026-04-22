'use client';
import './style.css';
import { HeroSection } from '@/sections/about/HeroSection';
import { AnimatedTextSection } from '@/sections/about/AnimatedTextSection';
import { SponsorsSection } from '@/sections/about/SponsorsSection';
import { AdvisorsSection } from '@/sections/about/AdvisorsSection';
// import { MetabaseSection } from '@/sections/about/MetabaseSection';
import { PanelsSection } from '@/sections/about/PanelSection';

export default function AboutPage() {
  return (
    <div className="about-page">
      <HeroSection />
      <AnimatedTextSection />
      <SponsorsSection />
      <AdvisorsSection />
      {/* <MetabaseSection /> */}
      <PanelsSection />
    </div>
  );
}
