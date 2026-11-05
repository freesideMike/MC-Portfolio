import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { detailedProjectsData } from '../../data/detailedProjectsData';
import { ProjectSingleView } from './ProjectSingleView';
import styles from './ProjectsShowcaseSlider.module.css';

interface ProjectsShowcaseSliderProps {
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  onBackToPortfolio: () => void;
  onOpenContact: () => void;
}

export const ProjectsShowcaseSlider: React.FC<ProjectsShowcaseSliderProps> = ({
  activeProjectId,
  onSelectProject,
  onBackToPortfolio,
  onOpenContact,
}) => {
  const { language } = useLanguage();
  const currentLang = (language === 'sv' || language === 'en') ? language : 'sv';
  const projectsMap = detailedProjectsData[currentLang];
  const containerRef = useRef<HTMLDivElement>(null);

  // Ordered list of 3 project IDs
  const projectOrder = ['ikea-automation-portal', 'sagonatt-ai', 'fps-mobile-game'];

  const activeIndex = Math.max(
    0,
    projectOrder.findIndex((id) => id === activeProjectId)
  );

  // Scroll smoothly to top when switching projects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProjectId]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      onSelectProject(projectOrder[activeIndex - 1]);
    }
  };

  const handleNext = () => {
    if (activeIndex < projectOrder.length - 1) {
      onSelectProject(projectOrder[activeIndex + 1]);
    }
  };

  return (
    <div className={styles.sliderRoot} ref={containerRef}>
      {/* Floating Side Navigation Arrows for Desktop */}
      {activeIndex > 0 && (
        <button
          type="button"
          className={`${styles.navFloatingBtn} ${styles.navFloatingPrev}`}
          onClick={handlePrev}
          title={language === 'sv' ? 'Föregående projekt' : 'Previous project'}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {activeIndex < projectOrder.length - 1 && (
        <button
          type="button"
          className={`${styles.navFloatingBtn} ${styles.navFloatingNext}`}
          onClick={handleNext}
          title={language === 'sv' ? 'Nästa projekt' : 'Next project'}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Track that slides horizontally */}
      <div
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${activeIndex * 100}vw)`,
        }}
      >
        {projectOrder.map((projId, index) => {
          const projectData = projectsMap[projId];
          if (!projectData) return null;

          // Next project reference for footer navigation
          const nextIndex = (index + 1) % projectOrder.length;
          const nextProjData = projectsMap[projectOrder[nextIndex]];
          const nextProj = {
            id: projectOrder[nextIndex],
            title: nextProjData.title,
          };

          return (
            <div key={projId} className={styles.slideItem}>
              <ProjectSingleView
                project={projectData}
                nextProject={nextProj}
                onSelectProject={onSelectProject}
                onBackToPortfolio={onBackToPortfolio}
                onOpenContact={onOpenContact}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
