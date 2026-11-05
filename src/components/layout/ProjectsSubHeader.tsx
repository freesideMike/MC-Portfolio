import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { FeaturedProjectItem } from '../../types';
import styles from './ProjectsSubHeader.module.css';

interface ProjectsSubHeaderProps {
  activeProjectId: string;
  onSelectProject: (project: FeaturedProjectItem) => void;
}

export const ProjectsSubHeader: React.FC<ProjectsSubHeaderProps> = ({
  activeProjectId,
  onSelectProject,
}) => {
  const { featuredProjects } = useLanguage();

  return (
    <div className={styles.subHeaderInner}>
      <nav className={styles.projectsNav} aria-label="Projektnavigering">
        {featuredProjects.map((project) => {
          const isActive = project.id === activeProjectId;

          return (
            <button
              key={project.id}
              type="button"
              className={`${styles.projectItem} ${
                isActive ? styles.projectItemActive : ''
              }`}
              onClick={() => onSelectProject(project)}
            >
              <span>{project.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
