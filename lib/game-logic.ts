import { Board, Player, Position, ROWS, COLS, EMPTY_BOARD } from '@/types/game';

/**
 * Creates an empty game board
 */
export function createEmptyBoard(): Board {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
}

/**
 * Checks if a column is full
 */
export function isColumnFull(board: Board, column: number): boolean {
  return board[0][column] !== null;
}

/**
 * Gets the next available row in a column
 */
export function getNextAvailableRow(board: Board, column: number): number | null {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][column] === null) {
      return row;
    }
  }
  return null;
}

/**
 * Drops a piece in a column
 */
export function dropPiece(
  board: Board,
  column: number,
  player: Player
): { newBoard: Board; position: Position | null } {
  const row = getNextAvailableRow(board, column);
  
  if (row === null) {
    return { newBoard: board, position: null };
  }

  const newBoard = board.map((r, i) =>
    r.map((cell, j) => (i === row && j === column ? player : cell))
  );

  return { newBoard, position: [row, column] };
}

/**
 * Checks if the board is full (draw condition)
 */
export function isBoardFull(board: Board): boolean {
  return board[0].every(cell => cell !== null);
}

/**
 * Gets all valid columns for the next move
 */
export function getValidColumns(board: Board): number[] {
  return Array.from({ length: COLS }, (_, i) => i).filter(col => !isColumnFull(board, col));
}

/**
 * Creates a deep copy of the board
 */
export function copyBoard(board: Board): Board {
  return board.map(row => [...row]);
}

/**
 * Switches the current player
 */
export function switchPlayer(player: Player): Player {
  return player === 1 ? 2 : 1;
}

/**
 * Checks if a position is valid on the board
 */
export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}
