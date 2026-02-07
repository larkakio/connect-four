# Connect Four: Neon Gravity

A futuristic Connect Four game with stunning cyberpunk neon visuals, built as a Mini App for Base.app and Farcaster.

## Features

- 🎮 **Classic Connect Four Gameplay**: Strategic 7×6 board game
- 🌈 **Cyberpunk Neon Design**: Stunning cyan and magenta neon effects
- 📱 **Mobile-First**: Optimized for touch with swipe gestures
- ✨ **Smooth Animations**: Physics-based piece drops and win celebrations
- 🎯 **Haptic Feedback**: Enhanced mobile experience
- 🚀 **Farcaster Integration**: Native mini app for Base.app

## Controls

- **Desktop**: Use arrow keys (← →) to select column, ↓ or Enter to drop
- **Mobile**: Swipe left/right to select column, swipe down or tap to drop
- **Click**: Click any column to drop a piece

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom neon theme
- **Animations**: Framer Motion + GSAP
- **Gestures**: @use-gesture/react
- **Web3**: Wagmi v2 + OnchainKit (Base Network)
- **Farcaster**: @farcaster/miniapp-sdk

## Getting Started

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the game.

### Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variable:
   - `NEXT_PUBLIC_APP_URL`: https://connect-four-xps4.vercel.app
4. Deploy

### Configure Farcaster

1. After deployment, go to [Base Build Account Association Tool](https://base.dev/preview?tab=account)
2. Paste your domain and click "Submit"
3. Click "Verify" to generate `accountAssociation` credentials
4. Update `public/.well-known/farcaster.json` with the credentials
5. Redeploy

### Test Your App

- Preview: [https://base.dev/preview](https://base.dev/preview)
- Verify metadata and account association
- Test in Base app by creating a post with your app URL

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with Farcaster metadata
│   ├── page.tsx            # Main game page
│   └── globals.css         # Global styles with neon effects
├── components/
│   ├── GameBoard/          # Board, Cell, Piece, GhostPiece
│   ├── Controls/           # PlayerPanel, GameControls, SwipeIndicator
│   ├── Animations/         # WinAnimation, ParticleEffect, ConfettiEffect
│   └── UI/                 # Button, NeonText, GlassPanel
├── hooks/
│   ├── useGameLogic.ts     # Game state management
│   ├── useSwipeGestures.ts # Touch gesture handling
│   └── useFarcasterSDK.ts  # Farcaster integration
├── lib/
│   ├── game-logic.ts       # Pure game functions
│   └── win-checker.ts      # Win detection algorithm
├── types/
│   ├── game.ts             # Game type definitions
│   └── farcaster.ts        # Farcaster types
└── public/
    ├── icon.png            # App icon (1024×1024)
    ├── hero-image.png      # Hero banner (1200×630)
    └── .well-known/
        └── farcaster.json  # Farcaster manifest
\`\`\`

## Game Rules

- **Objective**: Connect 4 pieces in a row (horizontal, vertical, or diagonal)
- **Players**: 2 players (Cyan vs Magenta)
- **Board**: 7 columns × 6 rows
- **Turns**: Players alternate dropping pieces
- **Gravity**: Pieces fall to the lowest available position
- **Win**: First player to connect 4 wins
- **Draw**: Board is full with no winner

## Performance

- ⚡ Load time: < 3 seconds
- 🎬 Animations: 60 FPS
- 👆 Touch targets: ≥ 44px
- ♿ Accessibility: Full keyboard support, ARIA labels, reduced motion support

## License

MIT

## Credits

Built for Base Mini Apps and Farcaster
Design inspired by Tron, Blade Runner, and Cyberpunk 2077
