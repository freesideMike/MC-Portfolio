import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import styles from './Navbar.module.css';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
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
        <a href="#" className={styles.logo}>
          {personalInfo.name}
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
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
          <Button
            variant="primary"
            size="sm"
            icon={<Mail size={15} />}
            onClick={onOpenContact}
          >
            {t.getInTouch}
          </Button>
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

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={styles.mobileNavLink}
            >
              {link.label}
            </a>
          ))}
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
            <Button
              variant="primary"
              size="sm"
              fullWidth
              icon={<Mail size={15} />}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
            >
              {t.getInTouch}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
