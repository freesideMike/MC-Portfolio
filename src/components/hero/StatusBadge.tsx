import React from 'react';

interface StatusBadgeProps {
  statusText?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  statusText = 'Öppen för nya uppdrag & roller',
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.4rem 1.1rem',
        borderRadius: '9999px',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'flex',
          height: '10px',
          width: '10px',
        }}
      >
        <span
          className="badge-beacon"
          style={{
            position: 'absolute',
            display: 'inline-flex',
            height: '100%',
            width: '100%',
            borderRadius: '9999px',
            background: '#10b981',
            opacity: 0.75,
          }}
        />
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            borderRadius: '9999px',
            height: '10px',
            width: '10px',
            background: '#10b981',
          }}
        />
      </span>
      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#34d399',
          letterSpacing: '0.02em',
        }}
      >
        {statusText}
      </span>
    </div>
  );
};
