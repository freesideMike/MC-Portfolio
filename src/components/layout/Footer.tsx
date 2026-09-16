import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.css';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const { personalInfo, t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left: Name */}
          <div className={styles.brand}>{personalInfo.name}</div>

          {/* Center: Copyright */}
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. {t.builtWith}
          </div>

          {/* Right: Links */}
          <div className={styles.links}>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <button onClick={onOpenContact} className={styles.link}>
              {t.emailLabel}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
