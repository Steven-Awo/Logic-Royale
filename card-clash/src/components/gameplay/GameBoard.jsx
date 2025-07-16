"use client"

import { useEffect } from "react"
import PlayerHand from "./PlayerHand"
import ProgressBar from "../common/ProgressBar"
import ComputerOpponent from "./ComputerOpponent"
import GameCenter from "./GameCenter"
import { useGameEngine } from "../../hooks/useGameEngine"
import { Trophy, RotateCcw, ArrowLeft, Brain, Target, Swords, Skull } from "lucide-react"

/**
 * GameBoard Component
 * @param {Object} props
 * @param {string} props.difficulty - Selected difficulty level
 * @param {Function} props.onBackToMenu - Function to call when going back to menu
 */
const GameBoard = ({ difficulty, onBackToMenu }) => {
  const {
    playerHand,
    computerHand,
    drawPile,
    playedCards,
    score,
    turn,
    winner,
    drawCard,
    playCard,
    makeComputerMove,
    startGame,
  } = useGameEngine(difficulty)

  // Auto-play logic for computer turn with difficulty-based timing
  useEffect(() => {
    if (turn === "computer" && !winner) {
      const thinkingTime = {
        beginner: 800,
        intermediate: 1200,
        advanced: 1800,
        nightmare: 2500,
      }

      const timeout = setTimeout(() => {
        makeComputerMove()
      }, thinkingTime[difficulty] || 1200)

      return () => clearTimeout(timeout)
    }
  }, [turn, computerHand, winner, difficulty])

  const handlePlayerPlay = (card) => {
    if (turn !== "player" || winner) return
    try {
      playCard(card, true)
    } catch (error) {
      console.error("Error playing card:", error)
    }
  }

  const handleDraw = () => {
    if (turn !== "player" || winner) return
    try {
      drawCard(true)
    } catch (error) {
      console.error("Error drawing card:", error)
    }
  }

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case "beginner":
        return <Brain className="w-5 h-5" />
      case "intermediate":
        return <Target className="w-5 h-5" />
      case "advanced":
        return <Swords className="w-5 h-5" />
      case "nightmare":
        return <Skull className="w-5 h-5" />
      default:
        return <Target className="w-5 h-5" />
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400"
      case "intermediate":
        return "text-blue-400"
      case "advanced":
        return "text-orange-400"
      case "nightmare":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToMenu}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Logic Royale
              </h1>
              <div className={`flex items-center gap-2 text-sm ${getDifficultyColor()}`}>
                {getDifficultyIcon()}
                <span className="font-semibold capitalize">{difficulty} Mode</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Score: {score}</div>
            <div className="text-slate-400 text-sm">Target: 45</div>
          </div>
        </header>

        {/* Progress Bar */}
        <ProgressBar score={score} target={45} />

        {/* Computer Opponent */}
        <ComputerOpponent
          hand={computerHand}
          isActive={turn === "computer"}
          winner={winner === "computer"}
          difficulty={difficulty}
        />

        {/* Game Center */}
        <GameCenter
          playedCards={playedCards}
          drawPile={drawPile}
          turn={turn}
          onDraw={handleDraw}
          canDraw={turn === "player" && !winner}
        />

        {/* Player Hand */}
        <PlayerHand
          hand={playerHand}
          onCardPlay={handlePlayerPlay}
          isPlayerTurn={turn === "player"}
          winner={winner === "player"}
        />

        {/* Winner Modal */}
        {winner && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-600 text-center max-w-md mx-4">
              <div className="mb-6">
                <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                <h2 className="text-3xl font-bold mb-2">{winner === "player" ? "Victory!" : "Game Over"}</h2>
                <p className="text-slate-300 text-lg mb-2">
                  {winner === "player"
                    ? "Congratulations! You reached 45 points!"
                    : "The computer beat you this time. Try again!"}
                </p>
                <div className={`flex items-center justify-center gap-2 text-sm ${getDifficultyColor()}`}>
                  {getDifficultyIcon()}
                  <span className="capitalize">{difficulty} Mode</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onBackToMenu}
                  className="flex-1 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Menu
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameBoard
