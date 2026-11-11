import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // Track which section is currently active via scroll or click
  const [scrolledHref, setScrolledHref] = useState<string>(
    activeNavHref || navLinks[0]?.href || '#about'
  );
  // Track which menu item is currently hovered
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Suppress scroll-spy briefly right after clicking a nav item so the spotlight glides smoothly
  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef<number | null>(null);

  // Refs for measuring exact spotlight position & width
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [spotlightStyle, setSpotlightStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  // Sync when activeNavHref prop changes (e.g. when viewing a project page)
  useEffect(() => {
    if (activeNavHref) {
      setScrolledHref(activeNavHref);
    }
  }, [activeNavHref]);

  // Scroll listener: header background + scroll-spy for sections
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If locked to a specific subpage (like activeNavHref="#projects") or mid-click-scroll, skip spy
      if (activeNavHref || isClickScrollingRef.current) return;

      const viewportTrigger = window.innerHeight * 0.34;
      let currentSection = navLinks[0]?.href || '#about';

      for (const link of navLinks) {
        const id = link.href.replace('#', '');
        const sectionEl = document.getElementById(id);
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top <= viewportTrigger) {
            currentSection = link.href;
          }
        }
      }

      // If scrolled near the bottom of the page, highlight the last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        const lastLink = navLinks[navLinks.length - 1];
        if (lastLink) {
          currentSection = lastLink.href;
        }
      }

      setScrolledHref(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeNavHref, navLinks]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickScrollTimeoutRef.current) {
        window.clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, []);

  // The item where the spotlight should shine: hovered item first, otherwise active/scrolled item
  const activeTargetKey = hoveredKey || activeNavHref || scrolledHref;

  const updateSpotlightPosition = useCallback(() => {
    const navEl = navRef.current;
    const targetEl = itemRefs.current[activeTargetKey];
    if (!navEl || !targetEl) return;

    const navRect = navEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setSpotlightStyle({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  }, [activeTargetKey]);

  useEffect(() => {
    updateSpotlightPosition();
    window.addEventListener('resize', updateSpotlightPosition);
    return () => window.removeEventListener('resize', updateSpotlightPosition);
  }, [updateSpotlightPosition, navLinks, t.resume]);

  const handleSelectNav = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setScrolledHref(href);
    isClickScrollingRef.current = true;
    if (clickScrollTimeoutRef.current) {
      window.clearTimeout(clickScrollTimeoutRef.current);
    }
    clickScrollTimeoutRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (onNavigateSection) {
      onNavigateSection(href);
      return;
    }

    if (href === '#' || href === '#about') {
      window.history.pushState(null, '', href === '#' ? window.location.pathname : href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerEl = navRef.current?.closest('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 68;
      const targetTop =
        targetEl.getBoundingClientRect().top + window.scrollY - headerHeight + 8;

      window.history.pushState(null, '', href);
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  const currentSelectedHref = activeNavHref || scrolledHref;

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Brand / Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            setScrolledHref(navLinks[0]?.href || '#about');
            if (onNavigateSection) {
              e.preventDefault();
              onNavigateSection('#');
            }
          }}
        >
          {personalInfo.name}
        </a>

        {/* Desktop Nav with Top Spotlight */}
        <nav
          ref={navRef}
          className={styles.desktopNav}
          onMouseLeave={() => setHoveredKey(null)}
        >
          {/* Sliding Overhead Spotlight Indicator */}
          <div
            className={styles.spotlightContainer}
            style={{
              transform: `translateX(${spotlightStyle.left}px)`,
              width: `${spotlightStyle.width}px`,
              opacity: spotlightStyle.opacity,
            }}
            aria-hidden="true"
          >
            <div className={styles.lampBar} />
            <div className={styles.spotlightCone} />
          </div>

          {navLinks.map((link) => {
            const isSelected = currentSelectedHref === link.href;
            const isLit = activeTargetKey === link.href;

            return (
              <a
                key={link.href}
                ref={(el) => {
                  itemRefs.current[link.href] = el;
                }}
                href={link.href}
                className={`${styles.navLink} ${isSelected ? styles.activeNavLink : ''} ${
                  isLit ? styles.litNavLink : ''
                }`}
                onMouseEnter={() => setHoveredKey(link.href)}
                onFocus={() => setHoveredKey(link.href)}
                onBlur={() => setHoveredKey(null)}
                onClick={(e) => handleSelectNav(link.href, e)}
              >
                {link.label}
              </a>
            );
          })}

          <button
            type="button"
            ref={(el) => {
              itemRefs.current['#resume'] = el;
            }}
            onClick={onOpenResume}
            onMouseEnter={() => setHoveredKey('#resume')}
            onFocus={() => setHoveredKey('#resume')}
            onBlur={() => setHoveredKey(null)}
            className={`${styles.navLink} ${
              activeTargetKey === '#resume' ? styles.litNavLink : ''
            }`}
          >
            {t.resume}
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.desktopActions}>
          <ContactButton size="sm" onClick={onOpenContact} />
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
          <div className="container">{subHeader}</div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => {
            const isActive = currentSelectedHref === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleSelectNav(link.href, e);
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
