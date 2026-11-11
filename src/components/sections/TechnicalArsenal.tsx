import React from 'react';
import { Code, Palette, Server, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './TechnicalArsenal.module.css';

export const TechnicalArsenal: React.FC = () => {
  const { skillCategories, t } = useLanguage();

  const renderIcon = (iconName: string, size = 22, strokeWidth = 2.2) => {
    switch (iconName) {
      case 'code':
        return <Code size={size} strokeWidth={strokeWidth} />;
      case 'palette':
        return <Palette size={size} strokeWidth={strokeWidth} />;
      case 'server':
        return <Server size={size} strokeWidth={strokeWidth} />;
      case 'sparkles':
        return <Sparkles size={size} strokeWidth={strokeWidth} />;
      case 'layers':
      default:
        return <Layers size={size} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <section id="arsenal" className={`section ${styles.section}`}>
      <div className={styles.arsenalContainer}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{t.technicalArsenalTitle}</h2>
          <p className={styles.subtitle}>{t.technicalArsenalSubtitle}</p>
        </div>

        {/* 4 Flex Columns with Staircase Hover Lists */}
        <div className={styles.cardsRow}>
          {skillCategories.map((category, cardIdx) => {
            const isTinted = cardIdx % 2 === 1;
            const totalRows = category.skills.length;

            return (
              <article
                key={category.title}
                className={`${styles.card} ${isTinted ? styles.cardTinted : styles.cardClean}`}
              >
                {/* Top Card Header (No small icon, concise description) */}
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{category.title}</h3>
                  <p className={styles.cardDesc}>{category.description}</p>
                </div>

                {/* Staircase Hover List with Sliced Background Icon */}
                <div
                  className={styles.staircaseList}
                  style={
                    {
                      '--total-rows': totalRows,
                    } as React.CSSProperties
                  }
                >
                  {category.skills.map((skill, rowIdx) => (
                    <div
                      key={skill}
                      className={styles.skillRow}
                      style={
                        {
                          '--row-index': rowIdx,
                        } as React.CSSProperties
                      }
                    >
                      {/* Horizontal slice of the giant category icon */}
                      <div className={styles.iconSliceViewport} aria-hidden="true">
                        <div className={styles.iconSliceCanvas}>
                          {renderIcon(category.icon, 235, 1.5)}
                        </div>
                      </div>

                      <span className={styles.skillLabel}>{skill}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
