import React, { useRef } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { sagonattData } from '../../data/sagonattData';
import { ContactButton } from '../ui/ContactButton';
import styles from './SagonattProjectPage.module.css';

interface SagonattProjectPageProps {
  onBack: () => void;
  onOpenContact: () => void;
}

export const SagonattProjectPage: React.FC<SagonattProjectPageProps> = ({
  onBack,
  onOpenContact,
}) => {
  const { language } = useLanguage();
  const data = sagonattData[language];
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 320, behavior: 'smooth' });
    }
  };

  const handleScrollTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageRoot}>
      {/* Intro Hero Section (Kort beskrivande text & Live-länk) */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{data.title}</h1>
            <p className={styles.heroLead}>{data.introLead}</p>
            <p className={styles.heroBody}>{data.introBody}</p>

            <div className={styles.heroActions}>
              <ContactButton
                size="md"
                onClick={onOpenContact}
              />

              <a
                href={data.liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSimpleLive}
              >
                <span>{data.liveAppBtn}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Showcases (Varje bild som sin egen sektion) */}
      <div className={styles.showcaseList}>
        {data.screens.map((screen, index) => {
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
                  {/* Visual Column / Phone Mockup */}
                  <div className={styles.screenVisualCol}>
                    <div className={styles.phoneFrame}>
                      <div className={styles.phoneIsland} />

                      {screen.isScrollable ? (
                        <div ref={scrollRef} className={styles.scrollContainer}>
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

                    {/* Scroll hint for the long scrollable landing page */}
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
                            onClick={handleScrollDown}
                            title="Skrolla neråt"
                          >
                            <ChevronDown size={13} />
                            <span>{language === 'sv' ? 'Ner' : 'Down'}</span>
                          </button>
                          <button
                            type="button"
                            className={styles.scrollBtn}
                            onClick={handleScrollTop}
                            title="Till toppen"
                          >
                            <RotateCcw size={12} />
                            <span>{language === 'sv' ? 'Topp' : 'Top'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Column with explanation */}
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
            <span className={styles.stepNumber}>Framtidsplaner</span>
            <h2 className={styles.sectionTitle}>{data.visionSectionTitle}</h2>
            <p className={styles.sectionSubtitle}>{data.visionSectionSubtitle}</p>
          </div>

          <div className={styles.visionGrid}>
            {data.visionItems.map((item) => (
              <div key={item.number} className={styles.visionCard}>
                <span className={styles.visionNumber}>{item.number}</span>
                <h3 className={styles.visionCardTitle}>{item.title}</h3>
                <p className={styles.visionCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className={styles.footerSection}>
        <div className="container">
          <div className={styles.footerBox}>
            <h2 className={styles.footerTitle}>{data.footerTitle}</h2>
            <p className={styles.footerDesc}>{data.footerDesc}</p>

            <div className={styles.footerActions}>
              <ContactButton
                size="md"
                onClick={onOpenContact}
              />

              <a
                href={data.liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSimpleLive}
              >
                <span>{data.liveAppBtn}</span>
                <ArrowUpRight size={15} />
              </a>

              <button
                type="button"
                className={styles.backButton}
                onClick={onBack}
              >
                <ArrowLeft size={16} />
                <span>{data.backToPortfolio}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
