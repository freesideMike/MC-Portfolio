import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'clean' | 'dark';
  clickable?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'clean',
  clickable = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${clickable ? styles.clickable : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
