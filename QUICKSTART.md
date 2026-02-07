# Quick Start Guide

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Visit [http://localhost:3000](http://localhost:3000)

### 4. Play the Game!

**Desktop Controls:**
- `←` `→` Arrow keys to select column
- `↓` or `Enter` to drop piece
- Click any column to drop

**Mobile/Touch:**
- Swipe left/right to select column
- Swipe down or tap to drop piece
- Haptic feedback enabled

## Features to Test

- ✅ Piece drop animations
- ✅ Win detection (4 in a row)
- ✅ Win celebration with particles and confetti
- ✅ Ghost piece preview
- ✅ Column hover effects
- ✅ New game reset
- ✅ Draw detection
- ✅ Swipe gestures (on mobile/touch devices)
- ✅ Keyboard controls

## Building for Production

```bash
npm run build
npm start
```

## File Structure Overview

```
├── app/
│   ├── layout.tsx       # Farcaster metadata + fonts
│   ├── page.tsx         # Main game component
│   └── globals.css      # Neon styles
├── components/
│   ├── GameBoard/       # Game board components
│   ├── Controls/        # UI controls
│   ├── Animations/      # Effects & animations
│   └── UI/              # Reusable UI components
├── hooks/
│   ├── useGameLogic.ts
│   ├── useSwipeGestures.ts
│   └── useFarcasterSDK.ts
├── lib/
│   ├── game-logic.ts
│   └── win-checker.ts
├── types/
│   ├── game.ts
│   └── farcaster.ts
└── public/
    ├── icon.png
    ├── hero-image.png
    └── .well-known/farcaster.json
```

## Next Steps

1. **Local Testing**: Play the game locally and verify all features work
2. **Customization**: Adjust colors, animations, or gameplay in the code
3. **Deployment**: Follow `DEPLOYMENT.md` for Vercel deployment
4. **Farcaster Setup**: Configure account association for Base app

## Customization Tips

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'neon-cyan': '#00D4FF',      // Player 1 color
  'neon-magenta': '#FF00FF',   // Player 2 color
  'neon-green': '#00FF41',     // Win color
}
```

### Adjust Animations
Edit `app/globals.css` and `styles/animations.css`

### Modify Game Rules
Edit `types/game.ts`:
```typescript
export const ROWS = 6;
export const COLS = 7;
export const WIN_LENGTH = 4;
```

### Change Fonts
Edit `app/layout.tsx` to import different Google Fonts

## Troubleshooting

**Problem**: Animations not working
- **Solution**: Clear browser cache, check console for errors

**Problem**: Swipe gestures not responding
- **Solution**: Test on actual touch device, not mouse emulation

**Problem**: Build fails
- **Solution**: Run `npm install` again, check Node version (18+)

**Problem**: Images not loading
- **Solution**: Verify files exist in `public/` folder

## Performance Tips

- Animations run at 60 FPS
- Use Chrome DevTools Performance tab to profile
- Test on real mobile devices
- Enable "Reduce Motion" in OS settings to test accessibility

## Resources

- **README.md**: Full documentation
- **DEPLOYMENT.md**: Step-by-step deployment guide
- **Base Docs**: https://docs.base.org/mini-apps/
- **Farcaster Docs**: https://miniapps.farcaster.xyz/

Enjoy building! 🎮✨
