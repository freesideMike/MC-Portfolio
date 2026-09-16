import React from 'react';
import { Code, Palette, Server, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import styles from './TechnicalArsenal.module.css';

export const TechnicalArsenal: React.FC = () => {
  const { skillCategories, t } = useLanguage();

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={24} strokeWidth={2.5} />;
      case 'palette':
        return <Palette size={24} strokeWidth={2.5} />;
      case 'server':
        return <Server size={24} strokeWidth={2.5} />;
      case 'sparkles':
        return <Sparkles size={24} strokeWidth={2.5} />;
      case 'layers':
      default:
        return <Layers size={24} strokeWidth={2.5} />;
    }
  };

  return (
    <section id="arsenal" className={`section ${styles.section}`}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{t.technicalArsenalTitle}</h2>
          <p className={styles.subtitle}>{t.technicalArsenalSubtitle}</p>
        </div>

        {/* 2 Bento Cards */}
        <div className="grid-2">
          {skillCategories.map((category) => {
            const isDark = category.variant === 'dark';

            return (
              <Card key={category.title} variant={isDark ? 'dark' : 'clean'}>
                <div className={styles.cardInner}>
                  <div>
                    <div className={styles.cardHeader}>
                      <div
                        style={{
                          color: isDark ? '#38bdf8' : '#df5b37',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {renderIcon(category.icon)}
                      </div>
                      <h3
                        className={styles.cardTitle}
                        style={{ color: isDark ? '#ffffff' : '#111827' }}
                      >
                        {category.title}
                      </h3>
                    </div>

                    <p className={isDark ? styles.cardDescDark : styles.cardDesc}>
                      {category.description}
                    </p>
                  </div>

                  <div className={styles.tagGroup}>
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={isDark ? 'techDark' : 'tech'}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
