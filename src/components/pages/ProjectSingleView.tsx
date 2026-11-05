import React, { useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  RotateCcw,
  Lock,
  Play,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { DetailedProjectContent } from '../../data/detailedProjectsData';
import { ContactButton } from '../ui/ContactButton';
import { Badge } from '../ui/Badge';
import styles from './ProjectSingleView.module.css';

interface ProjectSingleViewProps {
  project: DetailedProjectContent;
  nextProject: { id: string; title: string } | null;
  onSelectProject: (projectId: string) => void;
  onBackToPortfolio: () => void;
  onOpenContact: () => void;
}

export const ProjectSingleView: React.FC<ProjectSingleViewProps> = ({
  project,
  nextProject,
  onSelectProject,
  onBackToPortfolio,
  onOpenContact,
}) => {
  const { language } = useLanguage();
  const phoneScrollRef = useRef<HTMLDivElement>(null);

  const handlePhoneScrollDown = () => {
    if (phoneScrollRef.current) {
      phoneScrollRef.current.scrollBy({ top: 320, behavior: 'smooth' });
    }
  };

  const handlePhoneScrollTop = () => {
    if (phoneScrollRef.current) {
      phoneScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <article className={styles.projectView}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topBadgeRow}>
              <span className={styles.projectCategoryBadge}>{project.badge}</span>
              <span className={styles.projectSubtitleBadge}>{project.subtitle}</span>
            </div>

            <h1 className={styles.heroTitle}>{project.title}</h1>
            <p className={styles.heroLead}>{project.introLead}</p>
            <p className={styles.heroBody}>{project.introBody}</p>

            {/* Confidentiality Notice if applicable */}
            {project.confidentialityNote && (
              <div className={styles.confidentialityBanner} role="status">
                <Lock size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>{project.confidentialityNote}</div>
              </div>
            )}

            {/* Tech Tags */}
            <div className={styles.heroTags}>
              <Layers size={14} className={styles.tagIcon} />
              {project.tags.map((tag) => (
                <Badge key={tag} variant="tech">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Hero CTA buttons */}
            <div className={styles.heroActions}>
              <ContactButton size="md" onClick={onOpenContact} />

              {project.liveAppUrl && project.liveAppBtn && (
                <a
                  href={project.liveAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSimpleLive}
                >
                  <span>{project.liveAppBtn}</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              {nextProject && (
                <button
                  type="button"
                  className={styles.btnQuickNext}
                  onClick={() => onSelectProject(nextProject.id)}
                >
                  <span>{language === 'sv' ? 'Nästa projekt' : 'Next project'}</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Screen Showcases */}
      <div className={styles.showcaseList}>
        {project.screens.map((screen, index) => {
          const isEven = index % 2 === 1;

          return (
            <section
              key={screen.id}
              className={`${styles.screenHero} ${
                index % 2 === 0 ? styles.screenHeroLight : styles.screenHeroAlt
              }`}
            >
              <div className="container">
                <div
                  className={`${styles.screenHeroGrid} ${
                    isEven ? styles.screenHeroGridReverse : ''
                  }`}
                >
                  {/* Visual Column */}
                  <div className={styles.screenVisualCol}>
                    {/* Render phone mockup for mobile app or clean desktop frame for portal/game */}
                    {screen.isScrollable || project.id === 'sagonatt-ai' ? (
                      <div className={styles.phoneFrame}>
                        <div className={styles.phoneIsland} />

                        {screen.isScrollable ? (
                          <div ref={phoneScrollRef} className={styles.scrollContainer}>
                            <img
                              src={screen.image}
                              alt={screen.title}
                              className={styles.screenImg}
                            />
                          </div>
                        ) : (
                          <div className={styles.staticContainer}>
                            <img
                              src={screen.image}
                              alt={screen.title}
                              className={styles.screenImg}
                            />
                          </div>
                        )}

                        <div className={styles.phoneIndicator} />
                      </div>
                    ) : (
                      <div className={styles.browserFrame}>
                        <div className={styles.browserHeader}>
                          <div className={styles.browserDots}>
                            <span className={styles.dotRed} />
                            <span className={styles.dotYellow} />
                            <span className={styles.dotGreen} />
                          </div>
                          <div className={styles.browserAddress}>
                            <span>
                              {project.id === 'ikea-automation-portal'
                                ? 'automation.ingka.ikea.com/robotics/status'
                                : 'unity.runtime/viewport/gyro-60fps'}
                            </span>
                          </div>
                        </div>

                        <div className={styles.browserBody}>
                          <img
                            src={screen.image}
                            alt={screen.title}
                            className={styles.screenImgWide}
                          />

                          {screen.isVideoMockup && (
                            <div className={styles.videoOverlay}>
                              <div className={styles.videoTopPill}>
                                <span className={styles.pulsingDot} />
                                <span>Gyro Tracking 60 FPS</span>
                              </div>

                              <div className={styles.videoControls}>
                                <div className={styles.playBtn} aria-label="Play gameplay clip">
                                  <Play size={14} fill="#ffffff" />
                                </div>
                                <span>
                                  {language === 'sv'
                                    ? 'Rörelsestyrning i realtid'
                                    : 'Real-time Gyro Motion'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Scroll hints for scrollable frame */}
                    {screen.isScrollable && (
                      <div className={styles.scrollHintBox}>
                        <span>
                          {language === 'sv'
                            ? 'Skrolla inuti telefonen för hela sidan'
                            : 'Scroll inside the phone for full page'}
                        </span>
                        <div className={styles.scrollButtons}>
                          <button
                            type="button"
                            className={styles.scrollBtn}
                            onClick={handlePhoneScrollDown}
                            title="Skrolla neråt"
                          >
                            <ChevronDown size={13} />
                            <span>{language === 'sv' ? 'Ner' : 'Down'}</span>
                          </button>
                          <button
                            type="button"
                            className={styles.scrollBtn}
                            onClick={handlePhoneScrollTop}
                            title="Till toppen"
                          >
                            <RotateCcw size={12} />
                            <span>{language === 'sv' ? 'Topp' : 'Top'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Description Column */}
                  <div className={styles.screenTextCol}>
                    <span className={styles.stepNumber}>
                      {screen.step} / {screen.title}
                    </span>
                    <h2 className={styles.screenTitle}>{screen.title}</h2>
                    <h3 className={styles.screenSubtitle}>{screen.subtitle}</h3>
                    <p className={styles.screenDesc}>{screen.description}</p>

                    <ul className={styles.highlightList}>
                      {screen.highlights.map((item, hIdx) => (
                        <li key={hIdx} className={styles.highlightItem}>
                          <span className={styles.highlightBullet} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {screen.techTags && screen.techTags.length > 0 && (
                      <div className={styles.stepTags}>
                        {screen.techTags.map((t) => (
                          <span key={t} className={styles.stepTagPill}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Vision & Plans for Further Development */}
      <section className={styles.visionSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.stepNumber}>
              {language === 'sv' ? 'Tekniska Lärdomar' : 'Technical Insights'}
            </span>
            <h2 className={styles.sectionTitle}>{project.visionSectionTitle}</h2>
            <p className={styles.sectionSubtitle}>{project.visionSectionSubtitle}</p>
          </div>

          <div className={styles.visionGrid}>
            {project.visionItems.map((item) => (
              <div key={item.number} className={styles.visionCard}>
                <span className={styles.visionNumber}>{item.number}</span>
                <h3 className={styles.visionCardTitle}>{item.title}</h3>
                <p className={styles.visionCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Footer & Navigation between projects */}
      <footer className={styles.footerSection}>
        <div className="container">
          <div className={styles.footerBox}>
            <h2 className={styles.footerTitle}>{project.footerTitle}</h2>
            <p className={styles.footerDesc}>{project.footerDesc}</p>

            <div className={styles.footerActions}>
              <ContactButton size="md" onClick={onOpenContact} />

              {project.liveAppUrl && project.liveAppBtn && (
                <a
                  href={project.liveAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSimpleLive}
                >
                  <span>{project.liveAppBtn}</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              {nextProject && (
                <button
                  type="button"
                  className={styles.nextProjectButton}
                  onClick={() => onSelectProject(nextProject.id)}
                >
                  <span>
                    {language === 'sv' ? 'Gå till nästa projekt' : 'Go to next project'}:{' '}
                    <strong>{nextProject.title}</strong>
                  </span>
                  <ArrowRight size={16} />
                </button>
              )}

              <button
                type="button"
                className={styles.backButton}
                onClick={onBackToPortfolio}
              >
                <ArrowLeft size={16} />
                <span>{project.backToPortfolio}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};
