import { useState, useCallback, useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';

interface SwipeGesturesConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeDown?: () => void;
  onTap?: (column: number) => void;
  columnCount?: number;
}

export function useSwipeGestures(config: SwipeGesturesConfig) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeDown,
    onTap,
    columnCount = 7,
  } = config;

  const [selectedColumn, setSelectedColumn] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const initialColumnRef = useRef(selectedColumn);

  // Haptic feedback helper
  const vibrate = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const moveLeft = useCallback(() => {
    setSelectedColumn(prev => {
      const newCol = Math.max(0, prev - 1);
      if (newCol !== prev) {
        vibrate(10);
        onSwipeLeft?.();
      }
      return newCol;
    });
  }, [vibrate, onSwipeLeft]);

  const moveRight = useCallback(() => {
    setSelectedColumn(prev => {
      const newCol = Math.min(columnCount - 1, prev + 1);
      if (newCol !== prev) {
        vibrate(10);
        onSwipeRight?.();
      }
      return newCol;
    });
  }, [columnCount, vibrate, onSwipeRight]);

  const drop = useCallback(() => {
    vibrate([20, 10, 20]);
    onSwipeDown?.();
  }, [vibrate, onSwipeDown]);

  const handleTap = useCallback((event: React.MouseEvent | React.TouchEvent, boardWidth: number) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    let clientX: number;
    if ('touches' in event.nativeEvent) {
      clientX = event.nativeEvent.touches[0]?.clientX || event.nativeEvent.changedTouches[0]?.clientX;
    } else {
      clientX = event.nativeEvent.clientX;
    }
    
    const x = clientX - rect.left;
    const column = Math.floor((x / rect.width) * columnCount);
    const boundedColumn = Math.max(0, Math.min(columnCount - 1, column));
    
    setSelectedColumn(boundedColumn);
    vibrate(15);
    onTap?.(boundedColumn);
  }, [columnCount, vibrate, onTap]);

  const bind = useDrag(
    ({ movement: [mx, my], direction: [dx, dy], velocity, tap, first, last }) => {
      if (tap) {
        return;
      }

      // Handle drag start
      if (first) {
        initialColumnRef.current = selectedColumn;
        setIsDragging(true);
      }

      // Handle drag end
      if (last) {
        setIsDragging(false);
        return;
      }

      setIsDragging(true);

      // Horizontal swipe to select column
      const columnOffset = Math.round(mx / 60);
      const newColumn = Math.max(0, Math.min(columnCount - 1, initialColumnRef.current + columnOffset));
      
      if (newColumn !== selectedColumn) {
        setSelectedColumn(newColumn);
        vibrate(8);
      }

      // Check for vertical swipe down
      if (my > 50 && dy > 0 && velocity[1] > 0.3) {
        drop();
      }
    }
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
        case 'Enter':
        case ' ':
          e.preventDefault();
          drop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, drop]);

  return {
    selectedColumn,
    setSelectedColumn,
    isDragging,
    bind,
    handleTap,
    moveLeft,
    moveRight,
    drop,
    vibrate,
  };
}
