# ♠️ Card Clash

![Card Clash Banner](public/vite.svg)

> **A modern, interactive card game built with React, Vite, and Tailwind CSS. Challenge the computer, master the deck, and become the Card Clash champion!**

---

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)]()

---

## 🚀 Overview

Card Clash is a web-based card game where you compete against a computer opponent. The deck is a unique blend of numbers, alphabets, and special symbols. With adjustable difficulty and a sleek UI, Card Clash is perfect for casual fun or as a React learning project.

---

## 🎮 Gameplay Rules

- **Deck Composition:**
  - 30 Number cards (N1–N30)
  - 6 Alphabet cards (A–F)
  - 4 Symbol cards (*, $, @, @)
- **How to Play:**
  1. Select your difficulty and start the game.
  2. Both you and the computer draw cards from a shuffled deck.
  3. Play a card each round; the higher value wins.
  4. Symbol cards may have special effects (customizable).
  5. The game ends when the deck is empty or a win condition is met.
- **Winning:**
  - The player with the most round wins is the champion!

---

## ✨ Features

- ♻️ Shuffle and play with a dynamic deck
- 🤖 Computer opponent with adjustable difficulty
- 📊 Progress bar and real-time feedback
- 🎨 Responsive, modern UI (Tailwind CSS)
- 🧩 Modular, reusable React components
- ⚡ Fast development with Vite

---

## 🖼️ Screenshots / Demo

<p align="center">
  <img src="public/screenshot-loyalroyals" alt="Game Mode Selection and How to Play - Logic Royale" width="800"/>
</p>

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)

### Installation
```bash
git clone <your-repo-url>
cd card-clash
npm install
```

### Running the App
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂️ Folder Structure

```text
card-clash/
├── public/                 # Static assets (e.g., vite.svg)
├── src/
│   ├── assets/             # Images and SVGs
│   ├── components/
│   │   ├── common/         # Shared UI (ProgressBar)
│   │   └── gameplay/       # Game logic components
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # CSS/Tailwind styles
│   ├── types/              # Type definitions (if any)
│   └── utils/              # Utility functions (deckUtils.js)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🧩 Component Breakdown

- **App.jsx**: Main entry point, routes and layout
- **GameBoard.jsx**: Core game logic and state
- **PlayerHand.jsx / ComputerOpponent.jsx**: Card display for each side
- **Card.jsx**: Renders individual cards
- **ProgressBar.jsx**: Visual progress indicator
- **useGameEngine.js**: Custom hook for game state/logic
- **deckUtils.js**: Deck generation and shuffling

---

## ⚙️ Customization

- **Deck Rules:** Edit `src/utils/deckUtils.js` to change card types or counts.
- **Game Logic:** Tweak `useGameEngine.js` or `GameBoard.jsx` for new rules or effects.
- **Styling:** Update Tailwind classes or `src/styles/index.css` for a new look.

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a Pull Request

> All contributions, issues, and feature requests are welcome!

---

## ❓ FAQ

**Q: Can I add new card types or effects?**
A: Yes! Edit `deckUtils.js` and update the game logic in `useGameEngine.js`.

**Q: How do I deploy this app?**
A: Build with `npm run build` and deploy the `dist/` folder to any static host (e.g., Vercel, Netlify).

**Q: Is this project beginner-friendly?**
A: Absolutely! The codebase is modular and well-commented.

---

## 🙏 Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

> _Made with ❤️ for learning, fun, and open source!_
