import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { detailedProjectsData } from '../../data/detailedProjectsData';
import { HeroSection } from '../hero/HeroSection';
import { ProfessionalExperience } from '../sections/ProfessionalExperience';
import { TechnicalArsenal } from '../sections/TechnicalArsenal';
import { CallToActionBanner } from '../sections/CallToActionBanner';
import { ProjectSingleView } from './ProjectSingleView';
import styles from './PrintPortfolioPage.module.css';

export const PrintPortfolioPage: React.FC = () => {
  const { language } = useLanguage();
  const currentLang = language === 'sv' || language === 'en' ? language : 'sv';
  const projectsMap = detailedProjectsData[currentLang];
  const projectOrder = ['ikea-automation-portal', 'sagonatt-ai', 'fps-mobile-game'];

  return (
    <div className={styles.printRoot}>
      {/* 1. Header & Introduktion */}
      <div className={styles.printHeaderCover}>
        <div className={styles.coverPill}>Full Portfolio & Case Studies Document</div>
        <h1 className={styles.coverName}>Mikael Carlsson</h1>
        <p className={styles.coverRole}>Frontend Developer • UI/UX Specialist • React & TypeScript</p>
        <p className={styles.coverMeta}>
          Utskriftsvänlig version innehållande startsida, erfarenhet, teknisk profil samt samtliga 3 djupgående case studies.
        </p>
      </div>

      {/* 2. Startsidan: Hero, Erfarenhet & Teknisk profil */}
      <section className={styles.printSection}>
        <HeroSection onOpenContact={() => {}} />
      </section>

      <section className={styles.printSection}>
        <ProfessionalExperience onOpenResume={() => {}} />
      </section>

      <section className={styles.printSection}>
        <TechnicalArsenal />
      </section>

      {/* 3. De tre djupgående projekten i full bredd */}
      <div className={styles.printProjectDivider}>
        <h2 className={styles.projectsIntroTitle}>Utvalda Projekt & Djupgående Case Studies</h2>
        <p className={styles.projectsIntroSub}>
          Nedan presenteras de 3 huvudprojekten med fullständiga skärmvyer, arkitektur, tekniska höjdpunkter och framtidsvisioner.
        </p>
      </div>

      {projectOrder.map((projId) => {
        const projectData = projectsMap[projId];
        if (!projectData) return null;

        return (
          <section key={projId} className={styles.printProjectPage}>
            <ProjectSingleView
              project={projectData}
              nextProject={null}
              onSelectProject={() => {}}
              onBackToPortfolio={() => {}}
              onOpenContact={() => {}}
            />
          </section>
        );
      })}

      {/* 4. Avslutande kontakt */}
      <section className={styles.printSection}>
        <CallToActionBanner onOpenContact={() => {}} />
      </section>
    </div>
  );
};
