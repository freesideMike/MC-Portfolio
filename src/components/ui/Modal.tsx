import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  subtitle?: React.ReactNode;
  size?: 'default' | 'large';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  badge,
  subtitle,
  size = 'default',
  children,
  footer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`${styles.modal} ${size === 'large' ? styles.modalLarge : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || badge || subtitle) && (
          <div className={styles.header}>
            <div>
              {badge && <div style={{ marginBottom: '0.4rem' }}>{badge}</div>}
              {typeof title === 'string' ? (
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>{title}</h3>
              ) : (
                title
              )}
              {subtitle && (
                <p style={{ color: '#6b7280', fontSize: '0.92rem', marginTop: '0.2rem' }}>
                  {subtitle}
                </p>
              )}
            </div>

            <button onClick={onClose} aria-label="Close modal" className={styles.closeButton}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content */}
        <div>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};
