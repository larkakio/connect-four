import { Board, Player, Position, WinLine, WIN_LENGTH, ROWS, COLS } from '@/types/game';

type Direction = [number, number];

const DIRECTIONS: Direction[] = [
  [0, 1],   // Horizontal →
  [1, 0],   // Vertical ↓
  [1, 1],   // Diagonal ↘
  [1, -1],  // Diagonal ↙
];

/**
 * Checks if there's a win from the last placed piece
 */
export function checkWin(
  board: Board,
  row: number,
  col: number,
  player: Player
): { win: boolean; line: WinLine | null } {
  if (!board[row]?.[col] || board[row][col] !== player) {
    return { win: false, line: null };
  }

  for (const [dx, dy] of DIRECTIONS) {
    const line: WinLine = [[row, col]];
    
    // Check forward direction
    let r = row + dx;
    let c = col + dy;
    while (
      r >= 0 && r < ROWS &&
      c >= 0 && c < COLS &&
      board[r][c] === player
    ) {
      line.push([r, c]);
      r += dx;
      c += dy;
    }
    
    // Check backward direction
    r = row - dx;
    c = col - dy;
    while (
      r >= 0 && r < ROWS &&
      c >= 0 && c < COLS &&
      board[r][c] === player
    ) {
      line.push([r, c]);
      r -= dx;
      c -= dy;
    }
    
    if (line.length >= WIN_LENGTH) {
      return { win: true, line };
    }
  }

  return { win: false, line: null };
}

/**
 * Checks for a draw (board is full with no winner)
 */
export function checkDraw(board: Board): boolean {
  return board[0].every(cell => cell !== null);
}

/**
 * Checks all possible win conditions on the board
 */
export function checkAllWins(board: Board): {
  winner: Player | null;
  winLine: WinLine | null;
} {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const player = board[row][col];
      if (player !== null) {
        const result = checkWin(board, row, col, player);
        if (result.win) {
          return { winner: player, winLine: result.line };
        }
      }
    }
  }
  return { winner: null, winLine: null };
}

/**
 * Evaluates if a position is part of a winning line
 */
export function isWinningPosition(position: Position, winLine: WinLine | null): boolean {
  if (!winLine) return false;
  const [row, col] = position;
  return winLine.some(([r, c]) => r === row && c === col);
}
