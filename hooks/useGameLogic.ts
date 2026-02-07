import { useState, useCallback } from 'react';
import { GameState, Player, Position, EMPTY_BOARD } from '@/types/game';
import { dropPiece, switchPlayer, createEmptyBoard, isColumnFull } from '@/lib/game-logic';
import { checkWin, checkDraw } from '@/lib/win-checker';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 1,
    winner: null,
    winLine: null,
    isDraw: false,
    isGameOver: false,
    moveCount: 0,
    lastMove: null,
  });

  const makeMove = useCallback((column: number): boolean => {
    if (gameState.isGameOver || isColumnFull(gameState.board, column)) {
      return false;
    }

    const { newBoard, position } = dropPiece(gameState.board, column, gameState.currentPlayer);
    
    if (!position) {
      return false;
    }

    const [row, col] = position;
    const { win, line } = checkWin(newBoard, row, col, gameState.currentPlayer);
    const isDraw = !win && checkDraw(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: win || isDraw ? gameState.currentPlayer : switchPlayer(gameState.currentPlayer),
      winner: win ? gameState.currentPlayer : null,
      winLine: line,
      isDraw,
      isGameOver: win || isDraw,
      moveCount: gameState.moveCount + 1,
      lastMove: position,
    });

    return true;
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 1,
      winner: null,
      winLine: null,
      isDraw: false,
      isGameOver: false,
      moveCount: 0,
      lastMove: null,
    });
  }, []);

  return {
    gameState,
    makeMove,
    resetGame,
  };
}
