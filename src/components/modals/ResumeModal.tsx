import React from 'react';
import {
  Printer,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Code2,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import styles from './ResumeModal.module.css';

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0077b5">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo, experienceItems, skillCategories, t, language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      badge={<Badge variant="accent">{t.curriculumVitae}</Badge>}
      title={personalInfo.name}
      subtitle={t.medieinstitutetGrad}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t.close}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Printer size={15} />}
            onClick={handlePrint}
          >
            {language === 'sv' ? 'Skriv ut / Spara som PDF' : 'Print / Save as PDF'}
          </Button>
        </>
      }
    >
      <div className={styles.stack}>
        {/* Contact Info Bar */}
        <div className={styles.contactBar}>
          <a href={`mailto:${personalInfo.email}`} className={styles.contactItem}>
            <Mail size={14} color="#df5b37" />
            <span>{personalInfo.email}</span>
          </a>

          <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className={styles.contactItem}>
            <Phone size={14} color="#df5b37" />
            <span>{personalInfo.phone}</span>
          </a>

          <span className={styles.contactItem}>
            <MapPin size={14} color="#df5b37" />
            <span>{personalInfo.location}</span>
          </span>

          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <LinkedinIcon size={14} />
            <span>LinkedIn Profil</span>
            <ExternalLink size={12} className={styles.noPrint} />
          </a>
        </div>

        {/* Profile Summary statement */}
        {personalInfo.bio && (
          <div className={styles.summaryBox}>
            <p className={styles.summaryText}>{personalInfo.bio}</p>
          </div>
        )}

        {/* Work Experience Section */}
        <div className={styles.sectionBlock}>
          <h4 className={styles.sectionTitle}>
            <Briefcase size={16} color="#df5b37" />
            <span>{language === 'sv' ? 'Arbetslivserfarenhet' : 'Work Experience'}</span>
          </h4>

          {experienceItems
            .filter((item) => item.id !== 'medieinstitutet')
            .map((item) => (
              <div key={item.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemRoleGroup}>
                    <h5 className={styles.itemRole}>{item.role}</h5>
                    <span className={styles.itemCompany}>• {item.company}</span>
                  </div>
                  <Badge variant={item.isCurrent ? 'accent' : 'default'}>
                    {item.period}
                  </Badge>
                </div>

                <p className={styles.itemDesc}>{item.description}</p>

                <div className={styles.itemTags}>
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="tech">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Education Section (Starts Page 2 in Print) */}
        <div className={`${styles.sectionBlock} ${styles.pageBreakSection}`}>
          <h4 className={styles.sectionTitle}>
            <GraduationCap size={16} color="#df5b37" />
            <span>{language === 'sv' ? 'Utbildning' : 'Education'}</span>
          </h4>

          <div className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <div className={styles.itemRoleGroup}>
                <h5 className={styles.itemRole}>
                  {language === 'sv'
                    ? 'Frontend Developer – 2-årig Yrkeshögskoleutbildning (YH)'
                    : 'Frontend Developer – 2-Year Higher Vocational Education (YH)'}
                </h5>
                <a
                  href={personalInfo.educationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.itemCompany}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>• Medieinstitutet – Stockholm</span>
                  <ExternalLink size={12} className={styles.noPrint} />
                </a>
              </div>
              <Badge variant="default">Sept 2023 – Maj 2025</Badge>
            </div>

            <p className={styles.itemDesc}>
              {language === 'sv'
                ? 'YH-utbildning i webbproduktion med fokus på Frontend, men inkluderade även kurser i Backend, UX/UI, Design och agila metoder.'
                : 'Higher Vocational Education in web development with specialization in Frontend, encompassing Backend, UX/UI, Design, and agile practices.'}
            </p>

            <blockquote
              style={{
                fontStyle: 'italic',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '0.75rem',
                margin: '0.3rem 0',
              }}
            >
              ”Avancerad webbutveckling med fokus på form och funktion” – Medieinstitutet
            </blockquote>

            <div className={styles.itemTags}>
              {['React', 'TypeScript', 'Node.js', 'REST APIs', 'UX/UI', 'Scrum', 'Design Systems'].map(
                (tag) => (
                  <Badge key={tag} variant="tech">
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>

        {/* Own Projects Highlights */}
        <div className={styles.sectionBlock}>
          <h4 className={styles.sectionTitle}>
            <Sparkles size={16} color="#df5b37" />
            <span>{language === 'sv' ? 'Egna Programmeringsprojekt' : 'Independent Projects'}</span>
          </h4>

          <div className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <div className={styles.itemRoleGroup}>
                <h5 className={styles.itemRole}>
                  {language === 'sv' ? 'FPS Mobile Game – Rörelsestyrt Spel' : 'FPS Mobile Game – Body Steering'}
                </h5>
                <span className={styles.itemCompany}>• Unity 3D & Mobile Sensors</span>
              </div>
              <Badge variant="accent">Sommaren 2026 – Pågående</Badge>
            </div>
            <p className={styles.itemDesc}>
              {language === 'sv'
                ? 'Koncept där spelaren styr sin avatar genom att vrida kroppen med hjälp av mobilens sensorer (gyroskop/orientering) istället för traditionell skärm-tiltning. 3D-miljön utvecklas i Unity-spelmotorn.'
                : 'Mobile game concept where players control their avatar by physically turning their body via device orientation sensors. 3D environment engineered in Unity.'}
            </p>
            <div className={styles.itemTags}>
              {['Unity (Game Engine)', 'Web Sensors', 'Gyroscope', '3D Environments', 'C# / TypeScript'].map(
                (tech) => (
                  <Badge key={tech} variant="tech">
                    {tech}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <div className={styles.itemRoleGroup}>
                <h5 className={styles.itemRole}>SaGoNatt-app</h5>
                <span className={styles.itemCompany}>• AI-driven Sagobok</span>
              </div>
              <Badge variant="default">Vintern 2025/26</Badge>
            </div>
            <p className={styles.itemDesc}>
              {language === 'sv'
                ? 'Godnattsago-app kopplad till AI som genererar sagor dynamiskt efter användarens val. Utvecklad först mot Gemini AI Pro och sedan mot lokal Llama-modell på mobilen för obegränsad sagogenerering utan token-begränsningar.'
                : 'AI bedtime story application dynamically generating chapters tailored to choices. Engineered with Gemini AI Pro and local on-device Llama AI to eliminate token constraints.'}
            </p>
            <div className={styles.itemTags}>
              {['React', 'TypeScript', 'Gemini AI Pro', 'Llama Local AI', 'Google Antigravity', 'Stitch'].map(
                (tech) => (
                  <Badge key={tech} variant="tech">
                    {tech}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className={styles.sectionBlock}>
          <h4 className={styles.sectionTitle}>
            <Code2 size={16} color="#df5b37" />
            <span>{language === 'sv' ? 'Teknisk Kompetensmatris' : 'Technical Proficiencies Matrix'}</span>
          </h4>

          <div className={styles.skillsMatrix}>
            {skillCategories.map((cat) => (
              <div key={cat.title} className={styles.skillCategoryBox}>
                <h5 className={styles.skillCategoryTitle}>{cat.title}</h5>
                <div className={styles.skillsPills}>
                  {cat.skills.map((skill) => (
                    <Badge key={skill} variant="tech">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
