import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ContactButton } from '../ui/ContactButton';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import styles from './Navbar.module.css';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  activeNavHref?: string;
  subHeader?: React.ReactNode;
  onNavigateSection?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenContact,
  activeNavHref,
  subHeader,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navLinks, personalInfo, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Brand / Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            if (onNavigateSection) {
              e.preventDefault();
              onNavigateSection('#');
            }
          }}
        >
          {personalInfo.name}
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => {
            const isActive = activeNavHref === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                onClick={(e) => {
                  if (onNavigateSection) {
                    e.preventDefault();
                    onNavigateSection(link.href);
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={onOpenResume}
            className={styles.navLink}
          >
            {t.resume}
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.desktopActions}>
          <ContactButton
            size="sm"
            onClick={onOpenContact}
          />
          <LanguageSwitcher />
        </div>

        {/* Mobile Controls */}
        <div className={styles.mobileControls}>
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={styles.mobileToggle}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sub Header for Sub-Navigation (e.g. Projects) */}
      {subHeader && (
        <div className={styles.subHeaderWrapper}>
          <div className="container">
            {subHeader}
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => {
            const isActive = activeNavHref === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onNavigateSection) {
                    e.preventDefault();
                    onNavigateSection(link.href);
                  }
                }}
                className={`${styles.mobileNavLink} ${
                  isActive ? styles.activeMobileNavLink : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className={styles.mobileNavLink}
          >
            {t.resume}
          </button>
          <div className={styles.mobileActions}>
            <ContactButton
              size="sm"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};
