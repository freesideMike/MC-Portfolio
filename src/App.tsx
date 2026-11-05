import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { ParallaxBackground } from './components/layout/ParallaxBackground';
import { ProjectsSubHeader } from './components/layout/ProjectsSubHeader';
import { HeroSection } from './components/hero/HeroSection';
import { TechnicalArsenal } from './components/sections/TechnicalArsenal';
import { ProfessionalExperience } from './components/sections/ProfessionalExperience';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { CallToActionBanner } from './components/sections/CallToActionBanner';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/modals/ContactModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { ProjectsShowcaseSlider } from './components/pages/ProjectsShowcaseSlider';
import { PrintPortfolioPage } from './components/pages/PrintPortfolioPage';
import type { FeaturedProjectItem } from './types';

const PortfolioContent: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string>('ikea-automation-portal');
  const [currentView, setCurrentView] = useState<'home' | 'project' | 'print'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#/print' || hash === '#print') {
        return 'print';
      }
      if (
        hash.includes('#/project/') ||
        hash === '#sagonatt' ||
        hash === '#ikea' ||
        hash === '#fps'
      ) {
        return 'project';
      }
    }
    return 'home';
  });

  // Synchronize hash with active project or print view
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/print' || hash === '#print') {
        setCurrentView('print');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash.includes('#/project/')) {
        const projectId = hash.replace('#/project/', '');
        if (
          projectId === 'ikea-automation-portal' ||
          projectId === 'sagonatt-ai' ||
          projectId === 'fps-mobile-game'
        ) {
          setActiveProjectId(projectId);
          setCurrentView('project');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash === '#sagonatt') {
        setActiveProjectId('sagonatt-ai');
        setCurrentView('project');
        return;
      } else if (hash === '#ikea') {
        setActiveProjectId('ikea-automation-portal');
        setCurrentView('project');
        return;
      } else if (hash === '#fps') {
        setActiveProjectId('fps-mobile-game');
        setCurrentView('project');
        return;
      }
      setCurrentView('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenProject = (project: FeaturedProjectItem) => {
    const targetId = project.id;
    window.location.hash = `#/project/${targetId}`;
    setActiveProjectId(targetId);
    setCurrentView('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProjectId = (projectId: string) => {
    window.location.hash = `#/project/${projectId}`;
    setActiveProjectId(projectId);
  };

  const handleBackToHome = (targetSection?: string) => {
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    setCurrentView('home');
    setTimeout(() => {
      const sectionId = targetSection ? targetSection.replace('#', '') : 'projects';
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigateSection = (href: string) => {
    if (href === '#') {
      handleBackToHome('top');
      return;
    }
    handleBackToHome(href);
  };

  const handleSelectProjectFromSubHeader = (project: FeaturedProjectItem) => {
    handleSelectProjectId(project.id);
  };

  if (currentView === 'print') {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <PrintPortfolioPage />
      </div>
    );
  }

  if (currentView === 'project') {
    return (
      <div
        className="portfolio-root"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowX: 'hidden',
        }}
      >
        <ParallaxBackground theme="light" speed={0.28} />

        {/* Top Navigation with active Project indicator & SubHeader */}
        <Navbar
          onOpenResume={() => setResumeOpen(true)}
          onOpenContact={() => setContactOpen(true)}
          activeNavHref="#projects"
          onNavigateSection={handleNavigateSection}
          subHeader={
            <ProjectsSubHeader
              activeProjectId={activeProjectId}
              onSelectProject={handleSelectProjectFromSubHeader}
            />
          }
        />

        <main style={{ flex: 1, overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
          <ProjectsShowcaseSlider
            activeProjectId={activeProjectId}
            onSelectProject={handleSelectProjectId}
            onBackToPortfolio={() => handleBackToHome('projects')}
            onOpenContact={() => setContactOpen(true)}
          />
        </main>

        <Footer onOpenContact={() => setContactOpen(true)} />
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    );
  }

  return (
    <div
      className="portfolio-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <ParallaxBackground theme="light" speed={0.28} />

      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <HeroSection onOpenContact={() => setContactOpen(true)} />
        <ProfessionalExperience onOpenResume={() => setResumeOpen(true)} />
        <FeaturedProjects onOpenProject={handleOpenProject} />
        <TechnicalArsenal />
        <CallToActionBanner onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Dialogs / Modals */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
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
