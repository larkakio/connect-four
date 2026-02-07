'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleEffect } from './ParticleEffect';
import { ConfettiEffect } from './ConfettiEffect';

interface WinAnimationProps {
  show: boolean;
  winner: 1 | 2;
}

export const WinAnimation: React.FC<WinAnimationProps> = ({ show, winner }) => {
  const winnerColor = winner === 1 ? '#00D4FF' : '#FF00FF';
  const winnerName = winner === 1 ? 'Player 1' : 'Player 2';

  return (
    <AnimatePresence>
      {show && (
        <>
          <ParticleEffect trigger={show} color={winnerColor} count={50} />
          <ConfettiEffect trigger={show} count={100} />
          
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              <motion.div
                className="text-6xl md:text-8xl font-orbitron font-bold"
                style={{
                  color: winnerColor,
                  textShadow: `
                    0 0 20px ${winnerColor},
                    0 0 40px ${winnerColor},
                    0 0 60px ${winnerColor}
                  `,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                VICTORY!
              </motion.div>
              
              <motion.div
                className="mt-4 text-2xl md:text-4xl font-inter"
                style={{ color: '#ffffff' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {winnerName} Wins!
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
