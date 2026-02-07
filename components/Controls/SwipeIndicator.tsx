'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SwipeIndicatorProps {
  show: boolean;
}

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ show }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!show) {
      setVisible(false);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-panel px-6 py-3 rounded-full">
            <div className="flex items-center gap-4 text-sm text-light-gray">
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <span className="text-2xl">←</span>
                <span>Swipe</span>
                <span className="text-2xl">→</span>
              </motion.div>
              
              <div className="w-px h-6 bg-steel-blue" />
              
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <span className="text-2xl">↓</span>
                <span>Drop</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
