'use client';

import React from 'react';
import { Player } from '@/types/game';
import { GlassPanel } from '../UI/GlassPanel';
import { NeonText } from '../UI/NeonText';

interface PlayerPanelProps {
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;
  isDraw: boolean;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({
  currentPlayer,
  isGameOver,
  winner,
  isDraw,
}) => {
  const player1Color = currentPlayer === 1 && !isGameOver ? 'cyan' : undefined;
  const player2Color = currentPlayer === 2 && !isGameOver ? 'magenta' : undefined;

  return (
    <GlassPanel className="w-full max-w-2xl mx-auto mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full ${currentPlayer === 1 && !isGameOver ? 'neon-cyan' : ''}`}
            style={{
              background: 'radial-gradient(circle, #00D4FF 0%, #00A8CC 100%)',
              opacity: currentPlayer === 1 && !isGameOver ? 1 : 0.5,
            }}
          />
          <div>
            <div className="text-sm text-light-gray">Player 1</div>
            <div className="font-orbitron font-bold text-neon-cyan">Cyan</div>
          </div>
        </div>

        <div className="text-center">
          {isGameOver ? (
            isDraw ? (
              <NeonText size="lg">DRAW!</NeonText>
            ) : (
              <NeonText size="lg" color={winner === 1 ? 'cyan' : 'magenta'}>
                {winner === 1 ? 'CYAN' : 'MAGENTA'} WINS!
              </NeonText>
            )
          ) : (
            <div>
              <div className="text-sm text-light-gray">Current Turn</div>
              <NeonText size="md" color={currentPlayer === 1 ? 'cyan' : 'magenta'}>
                {currentPlayer === 1 ? 'CYAN' : 'MAGENTA'}
              </NeonText>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-light-gray">Player 2</div>
            <div className="font-orbitron font-bold text-neon-magenta">Magenta</div>
          </div>
          <div
            className={`w-12 h-12 rounded-full ${currentPlayer === 2 && !isGameOver ? 'neon-magenta' : ''}`}
            style={{
              background: 'radial-gradient(circle, #FF00FF 0%, #CC00CC 100%)',
              opacity: currentPlayer === 2 && !isGameOver ? 1 : 0.5,
            }}
          />
        </div>
      </div>
    </GlassPanel>
  );
};
