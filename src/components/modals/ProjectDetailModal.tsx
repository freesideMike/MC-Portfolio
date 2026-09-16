import React from 'react';
import {
  Lock,
  CheckCircle2,
  Image as ImageIcon,
  Play,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { FeaturedProjectItem } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import styles from './ProjectDetailModal.module.css';

interface ProjectDetailModalProps {
  project: FeaturedProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const { t, language } = useLanguage();

  if (!project) return null;

  return (
    <Modal
      isOpen={!!project}
      onClose={onClose}
      size="large"
      badge={<Badge variant="accent">{t.projectDeepDive}</Badge>}
      title={project.title}
      subtitle={project.subtitle}
      footer={
        <Button variant="secondary" size="sm" onClick={onClose}>
          {t.close}
        </Button>
      }
    >
      {/* Confidentiality Notice for Internal Enterprise Projects */}
      {project.confidentialityNote && (
        <div className={styles.confidentialityBanner} role="status">
          <Lock size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>{project.confidentialityNote}</div>
        </div>
      )}

      {/* Description */}
      <p className={styles.description}>{project.description}</p>

      {/* Key Highlights Bullet Points */}
      {project.keyHighlights && project.keyHighlights.length > 0 && (
        <div className={styles.highlightsBox}>
          <h4 className={styles.highlightsTitle}>
            {language === 'sv' ? 'Centrala Teknologier & Lösningar' : 'Key Architecture & Features'}
          </h4>
          <ul className={styles.highlightsList}>
            {project.keyHighlights.map((highlight) => (
              <li key={highlight} className={styles.highlightItem}>
                <CheckCircle2 size={16} color="#df5b37" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery & Visual Showcase */}
      {project.gallery && project.gallery.length > 0 && (
        <div className={styles.gallerySection}>
          <h4 className={styles.galleryTitle}>
            <ImageIcon size={18} color="#df5b37" />
            <span>
              {language === 'sv' ? 'Projektbilder & Förhandsvisning' : 'Visual Showcase & Media'}
            </span>
          </h4>

          <div className={styles.galleryGrid}>
            {project.gallery.map((item, index) => {
              const isVideo = item.type === 'video-mockup';

              return (
                <div key={index} className={styles.mediaCard}>
                  <div className={styles.mediaVisualWrapper}>
                    <img
                      src={item.url}
                      alt={item.caption || project.title}
                      className={styles.mediaVisual}
                    />

                    {isVideo && (
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

                  <div className={styles.mediaMeta}>
                    {item.badge && (
                      <div className={styles.badgeRow}>
                        <Badge variant="accent">{item.badge}</Badge>
                      </div>
                    )}
                    {item.caption && (
                      <p className={styles.mediaCaption}>{item.caption}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div className={styles.techSection}>
        <h4 className={styles.techTitle}>
          <Layers size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
          {t.techAndTools}
        </h4>
        <div className={styles.techGroup}>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="tech">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Modal>
  );
};
