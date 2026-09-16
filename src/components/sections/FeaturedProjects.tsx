import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { FeaturedProjectItem } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import styles from './FeaturedProjects.module.css';

interface FeaturedProjectsProps {
  onOpenProject: (project: FeaturedProjectItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenProject }) => {
  const { featuredProjects, personalInfo, t } = useLanguage();

  return (
    <section id="projects" className={`section ${styles.section}`}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{t.featuredProjectsTitle}</h2>
            <p className={styles.subtitle}>{t.featuredProjectsSubtitle}</p>
          </div>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <span>{t.viewGithub}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* 3 Projects Grid */}
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              variant="clean"
              clickable
              className={styles.projectCard}
              onClick={() => onOpenProject(project)}
            >
              {/* Image Preview */}
              <div className={styles.imageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>

                {/* Card Footer with Tags and Arrow */}
                <div className={styles.cardFooter}>
                  <div className={styles.tagGroup}>
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="tech">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className={styles.arrowButton}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
