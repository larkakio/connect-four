'use client';

import React from 'react';
import { Cell as CellType } from '@/types/game';

interface CellProps {
  value: CellType;
  isWinningCell: boolean;
  column: number;
  row: number;
}

export const Cell: React.FC<CellProps> = React.memo(({ value, isWinningCell }) => {
  return (
    <div 
      className="relative w-full h-full rounded-full border-2 grid-line-animated"
      style={{
        borderColor: 'rgba(22, 33, 62, 0.5)',
        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.4) 0%, rgba(45, 27, 78, 0.3) 100%)',
      }}
    >
      {/* Cell glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  );
});

Cell.displayName = 'Cell';
