'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'green';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'cyan', 
  children, 
  className = '',
  ...props 
}) => {
  const variantClass = variant === 'magenta' ? 'neon-button-magenta' : '';
  
  return (
    <button
      className={`neon-button ${variantClass} ${className} rounded-lg hover-lift`}
      {...props}
    >
      {children}
    </button>
  );
};
