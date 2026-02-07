'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
}

interface ConfettiEffectProps {
  trigger: boolean;
  count?: number;
}

const COLORS = ['#00D4FF', '#FF00FF', '#00FF41', '#FFFF00', '#FF6B6B'];

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, count = 50 }) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (trigger) {
      const newConfetti: Confetti[] = [];
      
      for (let i = 0; i < count; i++) {
        newConfetti.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 2,
          rotation: Math.random() * 720,
        });
      }
      
      setConfetti(newConfetti);
      
      // Clear confetti after animation
      setTimeout(() => setConfetti([]), 4000);
    }
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              backgroundColor: piece.color,
              left: `${piece.x}%`,
              top: '-10%',
              boxShadow: `0 0 10px ${piece.color}`,
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: '110vh',
              opacity: 0,
              rotate: piece.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'linear',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
