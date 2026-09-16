import React, { useState } from 'react';
import { Send, Copy, Check, Sparkles, Mail, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetAndClose = () => {
    setErrorMessage(null);
    onClose();
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const accessKey =
      (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
      '51675230-0013-4870-b71d-5e336f80629b';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Nytt meddelande från ${formData.name.trim()} via Portfolio`,
          from_name: `${formData.name.trim()} (Portfolio)`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#df5b37', '#f97316', '#3b82f6'],
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(data.message || t.sendError);
      }
    } catch {
      setErrorMessage(t.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={t.getInTouch}
      subtitle={t.ctaSubtitle}
    >
      {/* Email Copy Utility */}
      <div className={styles.emailBox}>
        <div className={styles.emailText}>
          <Mail size={18} color="#df5b37" />
          <span>{personalInfo.email}</span>
        </div>

        <Button variant="secondary" size="sm" onClick={handleCopyEmail}>
          {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          <span>{copied ? t.copied : t.copy}</span>
        </Button>
      </div>

      {/* Message Form or Success Feedback */}
      {isSubmitted ? (
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <Sparkles size={28} />
          </div>
          <h4 className={styles.successTitle}>{t.messageSent}</h4>
          <p className={styles.successDesc}>{t.messageSentDesc}</p>
          <div className={styles.successActions}>
            <Button variant="secondary" size="sm" onClick={handleSendAnother}>
              {t.sendAnother}
            </Button>
            <Button variant="primary" size="sm" onClick={handleResetAndClose}>
              {t.close}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {errorMessage && (
            <div className={styles.errorBanner} role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{errorMessage}</div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>{t.yourName}</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t.yourEmail}</label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t.yourMessage}</label>
            <textarea
              required
              rows={4}
              disabled={isSubmitting}
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={styles.textarea}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="md"
            fullWidth
            icon={
              isSubmitting ? (
                <Loader2 size={16} className={styles.spinner} />
              ) : (
                <Send size={16} />
              )
            }
          >
            {isSubmitting ? t.sending : t.sendMessage}
          </Button>
        </form>
      )}
    </Modal>
  );
};
