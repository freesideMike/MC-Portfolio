import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import styles from './ProfessionalExperience.module.css';

interface ProfessionalExperienceProps {
  onOpenResume?: () => void;
}

export const ProfessionalExperience: React.FC<ProfessionalExperienceProps> = ({
  onOpenResume,
}) => {
  const { experienceItems, t, language } = useLanguage();

  return (
    <section id="experience" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left Column: Heading & CTA */}
          <div className={styles.leftCol}>
            <h2 className={styles.title} style={{ whiteSpace: 'pre-line' }}>
              {t.professionalExperienceTitle}
            </h2>
            <p className={styles.subtitle}>{t.professionalExperienceSubtitle}</p>

            {onOpenResume && (
              <div style={{ marginTop: '1.75rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<FileText size={15} />}
                  onClick={onOpenResume}
                >
                  {language === 'sv' ? 'Öppna komplett CV' : 'Open Full Resume'}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Experience Cards */}
          <div className={styles.cardsStack}>
            {experienceItems.map((item) => (
              <Card key={item.id} variant="clean">
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <Badge variant={item.isCurrent ? 'accent' : 'default'}>
                      {item.period}
                    </Badge>
                  </div>

                  <div className={styles.company}>{item.company}</div>

                  <p className={styles.desc}>{item.description}</p>

                  <div className={styles.tagGroup}>
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
