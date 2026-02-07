'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
}

interface ParticleEffectProps {
  trigger: boolean;
  color?: string;
  count?: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ 
  trigger, 
  color = '#00D4FF',
  count = 30 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 100 + Math.random() * 100;
        
        newParticles.push({
          id: Date.now() + i,
          x: 0,
          y: 0,
          color: color,
          size: 4 + Math.random() * 8,
          velocityX: Math.cos(angle) * velocity,
          velocityY: Math.sin(angle) * velocity,
        });
      }
      
      setParticles(newParticles);
      
      // Clear particles after animation
      setTimeout(() => setParticles([]), 1000);
    }
  }, [trigger, color, count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
              left: '50%',
              top: '50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: particle.velocityX,
              y: particle.velocityY,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
