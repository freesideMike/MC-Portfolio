import React from 'react';
import { ArrowUpRight, MapPin, Phone, GraduationCap, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import styles from './HeroSection.module.css';

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0077b5">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { personalInfo, t, language } = useLanguage();

  return (
    <section id="about" className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Intro Text */}
          <div>
            <div className={styles.badgeContainer}>
              <Badge variant="default">{personalInfo.role}</Badge>
            </div>

            <h1 className={styles.title}>
              {personalInfo.headline}{' '}
              <span className={styles.highlight}>{personalInfo.highlightWord}</span>
              {language === 'sv' ? ', form och funktion.' : ', form, and function.'}
            </h1>

            <p className={styles.bio}>{personalInfo.bio}</p>

            <div className={styles.actions}>
              <Button
                variant="secondary"
                size="md"
                asAnchor
                href="#experience"
                icon={<ArrowUpRight size={17} />}
              >
                {t.viewWork}
              </Button>

              <Button
                variant="primary"
                size="md"
                icon={<Mail size={17} />}
                onClick={onOpenContact}
              >
                {t.getInTouch}
              </Button>
            </div>

            {/* Quick Contact & Info Bar */}
            <div className={styles.contactMeta}>
              <span className={styles.contactItem}>
                <MapPin size={14} color="#df5b37" />
                <span>{personalInfo.location}</span>
              </span>

              <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className={styles.contactItem}>
                <Phone size={14} color="#df5b37" />
                <span>{personalInfo.phone}</span>
              </a>

              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.educationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <GraduationCap size={14} color="#3b82f6" />
                <span>Medieinstitutet YH</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Portrait */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              {/* Background Offset Outline Frame */}
              <div className={styles.offsetFrame} />

              {/* Photo Card */}
              <div className={styles.photoCard}>
                <img
                  src="/images/mikael.png"
                  alt={personalInfo.name}
                  className={styles.photo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
