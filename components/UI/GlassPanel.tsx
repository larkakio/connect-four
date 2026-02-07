'use client';

import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-panel rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};
