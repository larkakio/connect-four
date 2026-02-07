'use client';

import React, { useEffect, useState } from 'react';
import { Board } from '@/components/GameBoard/Board';
import { PlayerPanel } from '@/components/Controls/PlayerPanel';
import { GameControls } from '@/components/Controls/GameControls';
import { SwipeIndicator } from '@/components/Controls/SwipeIndicator';
import { WinAnimation } from '@/components/Animations/WinAnimation';
import { NeonText } from '@/components/UI/NeonText';
import { FarcasterReady } from '@/components/FarcasterReady';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK';

export default function Home() {
  const { gameState, makeMove, resetGame } = useGameLogic();
  const farcasterContext = useFarcasterSDK();
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);
  const [movesMade, setMovesMade] = useState(0);

  const {
    selectedColumn,
    isDragging,
    bind,
    handleTap,
    drop,
  } = useSwipeGestures({
    onSwipeDown: () => {
      if (!gameState.isGameOver) {
        const success = makeMove(selectedColumn);
        if (success) {
          setMovesMade(prev => prev + 1);
          if (movesMade < 2) {
            setShowSwipeIndicator(true);
          } else {
            setShowSwipeIndicator(false);
          }
        }
      }
    },
    columnCount: 7,
  });

  const handleColumnClick = (column: number) => {
    if (!gameState.isGameOver) {
      const success = makeMove(column);
      if (success) {
        setMovesMade(prev => prev + 1);
        setShowSwipeIndicator(false);
      }
    }
  };

  const handleNewGame = () => {
    resetGame();
    setMovesMade(0);
    setShowSwipeIndicator(true);
  };

  useEffect(() => {
    // Hide indicator after 5 seconds or 3 moves
    const timer = setTimeout(() => {
      if (movesMade >= 3) {
        setShowSwipeIndicator(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [movesMade]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Notify Farcaster that app is ready */}
      <FarcasterReady />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF00FF 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <NeonText size="xl" className="mb-2">
            NEON GRAVITY
          </NeonText>
          <p className="text-light-gray text-lg">Connect Four in Cyberpunk Style</p>
          {farcasterContext.user && (
            <p className="text-neon-cyan mt-2">
              Playing as @{farcasterContext.user.username}
            </p>
          )}
        </div>

        {/* Game Area */}
        <PlayerPanel
          currentPlayer={gameState.currentPlayer}
          isGameOver={gameState.isGameOver}
          winner={gameState.winner}
          isDraw={gameState.isDraw}
        />

        <div {...bind()} className="touch-none">
          <Board
            board={gameState.board}
            currentPlayer={gameState.currentPlayer}
            selectedColumn={selectedColumn}
            winLine={gameState.winLine}
            onColumnClick={handleColumnClick}
            isDragging={isDragging}
            isGameOver={gameState.isGameOver}
          />
        </div>

        <GameControls
          onNewGame={handleNewGame}
          isGameOver={gameState.isGameOver}
        />

        {/* Swipe Indicator */}
        <SwipeIndicator show={showSwipeIndicator && !gameState.isGameOver} />

        {/* Win Animation */}
        <WinAnimation
          show={gameState.isGameOver && gameState.winner !== null}
          winner={gameState.winner || 1}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-light-gray">
          <p>Built for Base Mini Apps</p>
          <p className="mt-1">Moves: {gameState.moveCount}</p>
        </div>
      </div>
    </main>
  );
}
