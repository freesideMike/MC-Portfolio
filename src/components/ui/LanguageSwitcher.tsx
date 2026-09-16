import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div className={`${styles.wrapper} ${className}`.trim()} role="group" aria-label="Språkväljare / Language selector">
      {/* Swedish Label */}
      <span
        onClick={() => setLanguage('sv')}
        className={`${styles.label} ${language === 'sv' ? styles.labelActive : ''}`}
        title="Välj svenska"
      >
        SV
      </span>

      {/* Pill Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={language === 'en'}
        onClick={toggleLanguage}
        className={`${styles.switchTrack} ${language === 'sv' ? styles.trackSv : styles.trackEn}`}
        title={language === 'sv' ? 'Byt till engelska (Switch to English)' : 'Byt till svenska (Switch to Swedish)'}
      >
        <span className={`${styles.thumb} ${language === 'sv' ? styles.thumbSv : styles.thumbEn}`} />
      </button>

      {/* English Label */}
      <span
        onClick={() => setLanguage('en')}
        className={`${styles.label} ${language === 'en' ? styles.labelActive : ''}`}
        title="Select English"
      >
        EN
      </span>
    </div>
  );
};
