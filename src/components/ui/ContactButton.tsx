import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ContactButton.module.css';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
  icon?: React.ReactNode;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  size = 'md',
  fullWidth = false,
  label,
  icon = <Mail size={15} />,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const { t } = useLanguage();
  const text = label || t.getInTouch;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.contactBtn} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ''
      } ${className}`.trim()}
      {...props}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
};
