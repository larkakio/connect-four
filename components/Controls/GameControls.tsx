'use client';

import React from 'react';
import { Button } from '../UI/Button';
import { GlassPanel } from '../UI/GlassPanel';

interface GameControlsProps {
  onNewGame: () => void;
  isGameOver: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({ onNewGame, isGameOver }) => {
  return (
    <GlassPanel className="w-full max-w-2xl mx-auto mt-4">
      <div className="flex items-center justify-center gap-4">
        <Button onClick={onNewGame} variant="cyan">
          {isGameOver ? 'Play Again' : 'New Game'}
        </Button>
        
        <div className="text-sm text-light-gray text-center hidden md:block">
          <p className="mb-1">🎮 Controls:</p>
          <p>← → to move | ↓ or Enter to drop</p>
          <p>Swipe left/right to select | Swipe down to drop</p>
        </div>
      </div>
    </GlassPanel>
  );
};
