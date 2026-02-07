export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];
export type Position = [number, number];
export type WinLine = Position[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winLine: WinLine | null;
  isDraw: boolean;
  isGameOver: boolean;
  moveCount: number;
  lastMove: Position | null;
}

export interface GameMove {
  column: number;
  player: Player;
  position: Position;
  timestamp: number;
}

export interface GameHistory {
  moves: GameMove[];
  winner: Player | null;
  timestamp: number;
}

export const ROWS = 6;
export const COLS = 7;
export const WIN_LENGTH = 4;

export const EMPTY_BOARD: Board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
