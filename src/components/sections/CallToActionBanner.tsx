import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
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

            <Button
              variant="primary"
              size="lg"
              icon={<Mail size={17} />}
              onClick={onOpenContact}
            >
              {t.sendAMessage}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
