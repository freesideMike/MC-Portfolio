import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { TechnicalArsenal } from './components/sections/TechnicalArsenal';
import { ProfessionalExperience } from './components/sections/ProfessionalExperience';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { CallToActionBanner } from './components/sections/CallToActionBanner';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/modals/ContactModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import type { FeaturedProjectItem } from './types';

const PortfolioContent: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FeaturedProjectItem | null>(null);

  return (
    <div
      className="portfolio-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <HeroSection onOpenContact={() => setContactOpen(true)} />
        <ProfessionalExperience onOpenResume={() => setResumeOpen(true)} />
        <FeaturedProjects onOpenProject={(project) => setSelectedProject(project)} />
        <TechnicalArsenal />
        <CallToActionBanner onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Dialogs / Modals */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
};

export default App;
