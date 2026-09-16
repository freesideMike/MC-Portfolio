import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Language,
  PersonalInfo,
  NavLink,
  SkillCategory,
  ExperienceItem,
  FeaturedProjectItem,
  UIStrings,
} from '../types';
import {
  personalInfoData,
  navLinksData,
  skillCategoriesData,
  experienceItemsData,
  featuredProjectsData,
  uiStringsData,
} from '../data/portfolioData';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: UIStrings;
  personalInfo: PersonalInfo;
  navLinks: NavLink[];
  skillCategories: SkillCategory[];
  experienceItems: ExperienceItem[];
  featuredProjects: FeaturedProjectItem[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang') as Language;
    if (saved === 'sv' || saved === 'en') return saved;
    // Check browser preference if available
    if (typeof navigator !== 'undefined' && navigator.language && navigator.language.startsWith('sv')) {
      return 'sv';
    }
    return 'sv';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'sv' ? 'en' : 'sv';
    setLanguage(next);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: uiStringsData[language],
    personalInfo: personalInfoData[language],
    navLinks: navLinksData[language],
    skillCategories: skillCategoriesData[language],
    experienceItems: experienceItemsData[language],
    featuredProjects: featuredProjectsData[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
