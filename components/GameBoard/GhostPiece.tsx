'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types/game';

interface GhostPieceProps {
  player: Player;
  column: number;
  show: boolean;
}

export const GhostPiece: React.FC<GhostPieceProps> = ({ player, column, show }) => {
  const isCyan = player === 1;
  const color = isCyan ? '#00D4FF' : '#FF00FF';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`ghost-${column}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.4, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-full ghost-fade pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color} 0%, ${color}88 50%, ${color}44 100%)`,
            boxShadow: `0 0 20px ${color}44`,
          }}
        />
      )}
    </AnimatePresence>
  );
};
