'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types/game';

interface PieceProps {
  player: Player;
  isWinning?: boolean;
  animate?: boolean;
  row?: number;
}

export const Piece: React.FC<PieceProps> = React.memo(({ 
  player, 
  isWinning = false, 
  animate = true,
  row = 0 
}) => {
  const isCyan = player === 1;
  const color = isCyan ? '#00D4FF' : '#FF00FF';
  
  const glowClass = isWinning ? 'win-glow' : 'piece-glow';
  
  return (
    <motion.div
      initial={animate ? { y: -600, scale: 0.8, opacity: 0 } : false}
      animate={{ 
        y: 0, 
        scale: isWinning ? [1, 1.1, 1] : 1,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 1,
        delay: animate ? row * 0.05 : 0,
      }}
      className={`absolute inset-0 rounded-full ${glowClass}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color} 0%, ${color}dd 50%, ${color}88 100%)`,
        boxShadow: `
          0 0 10px ${color},
          0 0 20px ${color},
          0 0 40px ${color},
          inset 0 0 10px ${color}
        `,
      }}
    >
      {/* Inner highlight */}
      <div
        className="absolute top-[20%] left-[25%] w-[30%] h-[30%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  );
});

Piece.displayName = 'Piece';
