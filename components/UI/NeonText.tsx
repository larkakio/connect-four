'use client';

import React from 'react';

interface NeonTextProps {
  children: React.ReactNode;
  color?: 'cyan' | 'magenta' | 'green';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const NeonText: React.FC<NeonTextProps> = ({ 
  children, 
  color = 'cyan',
  className = '',
  size = 'md'
}) => {
  const colorClass = color === 'cyan' ? 'neon-text-cyan' : 'neon-text-magenta';
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-3xl',
    xl: 'text-5xl',
  };

  return (
    <span className={`${colorClass} ${sizeClasses[size]} font-orbitron font-bold ${className}`}>
      {children}
    </span>
  );
};
