'use client';

import React, { useRef } from 'react';
import { Board as BoardType, Player, WinLine } from '@/types/game';
import { Cell } from './Cell';
import { Piece } from './Piece';
import { GhostPiece } from './GhostPiece';
import { isWinningPosition } from '@/lib/win-checker';
import { isColumnFull } from '@/lib/game-logic';
import { ROWS, COLS } from '@/types/game';

interface BoardProps {
  board: BoardType;
  currentPlayer: Player;
  selectedColumn: number;
  winLine: WinLine | null;
  onColumnClick: (column: number) => void;
  isDragging: boolean;
  isGameOver: boolean;
}

export const Board: React.FC<BoardProps> = ({
  board,
  currentPlayer,
  selectedColumn,
  winLine,
  onColumnClick,
  isDragging,
  isGameOver,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const handleClick = (column: number) => {
    if (!isGameOver && !isColumnFull(board, column)) {
      onColumnClick(column);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        ref={boardRef}
        className="relative rounded-2xl p-6 border-2 border-neon-cyan"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.6) 0%, rgba(45, 27, 78, 0.5) 100%)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
        }}
      >
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isWinning = isWinningPosition([rowIndex, colIndex], winLine);
              const isSelected = colIndex === selectedColumn;
              const isTopRow = rowIndex === 0;
              const showGhost = isSelected && isTopRow && !isGameOver && cell === null;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => handleClick(colIndex)}
                  style={{ minWidth: '40px', minHeight: '40px' }}
                >
                  <Cell
                    value={cell}
                    isWinningCell={isWinning}
                    column={colIndex}
                    row={rowIndex}
                  />
                  
                  {cell && (
                    <Piece
                      player={cell}
                      isWinning={isWinning}
                      animate={true}
                      row={rowIndex}
                    />
                  )}
                  
                  {showGhost && (
                    <GhostPiece
                      player={currentPlayer}
                      column={colIndex}
                      show={!isDragging}
                    />
                  )}
                  
                  {/* Column hover effect */}
                  {isSelected && !isGameOver && (
                    <div
                      className="absolute inset-0 rounded-full column-highlight pointer-events-none"
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
