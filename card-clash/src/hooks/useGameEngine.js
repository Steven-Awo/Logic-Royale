"use client"

// useGameEngine.js
// Custom game logic hook to manage state, turns, score, and card handling
import { useEffect, useState } from "react"

// Full deck generator with card types and defined behaviors
const generateDeck = (difficulty = "intermediate") => {
  // Adjust card distribution based on difficulty
  const difficultySettings = {
    beginner: { favorableRatio: 0.7, unfavorableRatio: 0.3 },
    intermediate: { favorableRatio: 0.5, unfavorableRatio: 0.5 },
    advanced: { favorableRatio: 0.3, unfavorableRatio: 0.7 },
    nightmare: { favorableRatio: 0.2, unfavorableRatio: 0.8 },
  }

  const settings = difficultySettings[difficulty] || difficultySettings.intermediate

  // Generate number cards with difficulty-based distribution
  const favorableCount = Math.floor(30 * settings.favorableRatio)
  const unfavorableCount = 30 - favorableCount

  const numberCards = []

  // Add favorable cards (even numbers - positive effects)
  for (let i = 0; i < favorableCount; i++) {
    const val = (i + 1) * 2 // Even numbers: 2, 4, 6, 8...
    numberCards.push({ id: `N${val}`, type: "number", value: val, effect: val })
  }

  // Add the unfavorable cards (odd numbers - negative effects)
  for (let i = 0; i < unfavorableCount; i++) {
    const val = i * 2 + 1 // Odd numbers: 1, 3, 5, 7...
    numberCards.push({ id: `N${val}`, type: "number", value: val, effect: -val })
  }

  const alphabetMap = ["A", "B", "C", "D", "E", "F"]
  const alphabetCards = alphabetMap.map((char, i) => ({
    id: `A${char}`,
    type: "alpha",
    char,
    value: i + 1,
    effect: (score) => Math.floor(score / (i + 1)),
  }))

  const symbolCards = [
    { id: "S*1", type: "symbol", symbol: "*", effect: "repeat" },
    { id: "S$1", type: "symbol", symbol: "$", effect: 10 },
    { id: "S@1", type: "symbol", symbol: "@", effect: "flexible" },
    { id: "S@2", type: "symbol", symbol: "@", effect: "flexible" },
  ]

  return [...numberCards, ...alphabetCards, ...symbolCards]
}

// Computer AI logic based on difficulty
const getComputerMove = (hand, score, difficulty, drawPile) => {
  if (hand.length === 0) return null

  switch (difficulty) {
    case "beginner":
      // Random play - just pick first card
      return hand[0]

    case "intermediate":
      // Simple strategy - prefer positive effects
      const positiveCards = hand.filter((card) => {
        if (card.type === "number") return card.effect > 0
        if (card.type === "symbol" && card.effect === 10) return true
        return false
      })
      return positiveCards.length > 0 ? positiveCards[0] : hand[0]

    case "advanced":
      // Strategic play - calculate best move
      let bestCard = hand[0]
      let bestScore = Number.NEGATIVE_INFINITY

      hand.forEach((card) => {
        let projectedScore = score
        if (card.type === "number") {
          projectedScore += card.effect
        } else if (card.type === "alpha") {
          projectedScore = card.effect(score)
        } else if (card.type === "symbol") {
          if (card.effect === 10) projectedScore += 10
          else if (card.effect === "flexible") {
            const diff = 45 - score
            if (Math.abs(diff) <= 5) projectedScore = 45
          }
        }

        // Prefer moves that get closer to 45 without going over
        const scoreValue = projectedScore <= 45 ? projectedScore : 45 - (projectedScore - 45) * 2

        if (scoreValue > bestScore) {
          bestScore = scoreValue
          bestCard = card
        }
      })
      return bestCard

    case "nightmare":
      // Optimal play - advanced strategy with blocking
      let optimalCard = hand[0]
      let optimalValue = Number.NEGATIVE_INFINITY

      hand.forEach((card) => {
        let value = 0
        let projectedScore = score

        if (card.type === "number") {
          projectedScore += card.effect
        } else if (card.type === "alpha") {
          projectedScore = card.effect(score)
        } else if (card.type === "symbol") {
          if (card.effect === 10) projectedScore += 10
          else if (card.effect === "flexible") {
            const diff = 45 - score
            if (Math.abs(diff) <= 5) projectedScore = 45
          }
        }

        // Heavily favor winning moves
        if (projectedScore >= 45) {
          value = 1000
        } else {
          // Prefer getting closer to 45
          value = projectedScore
          // Bonus for being close to 45
          if (projectedScore >= 40) value += 50
          if (projectedScore >= 35) value += 25
        }

        if (value > optimalValue) {
          optimalValue = value
          optimalCard = card
        }
      })
      return optimalCard

    default:
      return hand[0]
  }
}

export const useGameEngine = (difficulty = "intermediate") => {
  const [playerHand, setPlayerHand] = useState([])
  const [computerHand, setComputerHand] = useState([])
  const [drawPile, setDrawPile] = useState([])
  const [playedCards, setPlayedCards] = useState([])
  const [score, setScore] = useState(0)
  const [turn, setTurn] = useState("player")
  const [winner, setWinner] = useState(null)

  const shuffle = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const startGame = () => {
    const newDeck = shuffle(generateDeck(difficulty))

    // Give computer better starting hand on higher difficulties
    let playerCards, computerCards

    if (difficulty === "nightmare") {
      // Sort deck to give computer the best cards
      const sortedDeck = [...newDeck].sort((a, b) => {
        const aValue = a.type === "number" ? a.effect : a.type === "symbol" && a.effect === 10 ? 10 : 5
        const bValue = b.type === "number" ? b.effect : b.type === "symbol" && b.effect === 10 ? 10 : 5
        return bValue - aValue
      })
      computerCards = sortedDeck.splice(0, 4)
      playerCards = newDeck.splice(0, 4)
    } else if (difficulty === "advanced") {
      // Give computer slightly better cards
      const goodCards = newDeck.filter((card) => card.type === "number" && card.effect > 0)
      const otherCards = newDeck.filter((card) => !(card.type === "number" && card.effect > 0))
      computerCards = [...goodCards.splice(0, 2), ...otherCards.splice(0, 2)]
      playerCards = [...otherCards.splice(0, 2), ...goodCards.splice(0, 2)]
      newDeck.splice(0, 0, ...goodCards, ...otherCards)
    } else {
      // Normal distribution for beginner and intermediate
      playerCards = newDeck.splice(0, 4)
      computerCards = newDeck.splice(0, 4)
    }

    setPlayerHand(playerCards)
    setComputerHand(computerCards)
    setDrawPile(newDeck)
    setPlayedCards([])
    setScore(0)
    setTurn("player")
    setWinner(null)
  }

  const drawCard = (isPlayer) => {
    if (drawPile.length === 0 && playedCards.length > 1) {
      const recycled = shuffle(playedCards.slice(0, -1))
      setDrawPile(recycled)
      setPlayedCards([playedCards[playedCards.length - 1]])
    }

    if (drawPile.length === 0) return

    const drawn = drawPile[0]
    setDrawPile((prev) => prev.slice(1))

    isPlayer ? setPlayerHand((prev) => [...prev, drawn]) : setComputerHand((prev) => [...prev, drawn])
  }

  const applyCardEffect = (card, lastCard = null) => {
    let newScore = score

    switch (card.type) {
      case "number":
        newScore += card.effect
        break
      case "alpha":
        newScore = card.effect(score)
        break
      case "symbol":
        if (card.effect === "repeat" && lastCard) {
          newScore = applyCardEffect(lastCard)
        } else if (card.effect === 10) {
          newScore += 10
        } else if (card.effect === "flexible") {
          const diff = 45 - score
          if (Math.abs(diff) <= 5) newScore = 45
        }
        break
      default:
        break
    }

    return newScore
  }

  const playCard = (card, isPlayer) => {
    if (winner) return

    const lastCard = playedCards[playedCards.length - 1]
    const newScore = applyCardEffect(card, lastCard)

    setScore(newScore)
    setPlayedCards((prev) => [...prev, card])

    if (isPlayer) {
      setPlayerHand((prev) => prev.filter((c) => c.id !== card.id))
      setTurn("computer")
    } else {
      setComputerHand((prev) => prev.filter((c) => c.id !== card.id))
      setTurn("player")
    }

    if (newScore >= 45) setWinner(isPlayer ? "player" : "computer")
  }

  const makeComputerMove = () => {
    if (computerHand.length > 0) {
      const selectedCard = getComputerMove(computerHand, score, difficulty, drawPile)
      if (selectedCard) {
        playCard(selectedCard, false)
      }
    } else {
      drawCard(false)
    }
  }

  useEffect(() => {
    startGame()
  }, [difficulty])

  return {
    playerHand,
    computerHand,
    drawPile,
    playedCards,
    score,
    turn,
    winner,
    difficulty,
    drawCard,
    playCard,
    makeComputerMove,
    startGame,
  }
}
