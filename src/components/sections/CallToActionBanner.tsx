import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ContactButton } from '../ui/ContactButton';
import styles from './CallToActionBanner.module.css';

interface CallToActionBannerProps {
  onOpenContact: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.bannerCard}>
          {/* Subtle Warm Sunset Underglow */}
          <div className={styles.glow} />

          <div className={styles.content}>
            <h2 className={styles.title}>{t.readyToBuild}</h2>

            <p className={styles.subtitle}>{t.ctaSubtitle}</p>

            <ContactButton
              size="lg"
              onClick={onOpenContact}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
