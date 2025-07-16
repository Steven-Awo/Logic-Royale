"use client"

import { useState } from "react"
import GameBoard from "./components/gameplay/GameBoard"
import DifficultySelection from "./components/gameplay/DifficultySelection"
import "./styles/index.css";

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setGameStarted(true)
  }

  const handleBackToMenu = () => {
    setGameStarted(false)
    setSelectedDifficulty(null)
  }

  if (!gameStarted) {
    return <DifficultySelection onDifficultySelect={handleDifficultySelect} />
  }

  return <GameBoard difficulty={selectedDifficulty} onBackToMenu={handleBackToMenu} />
}
