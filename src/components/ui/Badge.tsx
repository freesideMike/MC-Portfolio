import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'default' | 'accent' | 'tech' | 'techDark';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  style,
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`.trim()} style={style}>
      {children}
    </span>
  );
};
