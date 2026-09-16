import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  asAnchor,
  href,
  className = '',
  ...props
}) => {
  const combinedClassName = `${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`.trim();

  if (asAnchor && href) {
    return (
      <a href={href} className={combinedClassName} {...(props as any)}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
      {icon}
    </button>
  );
};
