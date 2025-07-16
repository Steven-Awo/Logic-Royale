"use client"
import { Zap, Hash, Star, DollarSign, AtSign } from "lucide-react"
import "tailwindcss";

/**
 * Card Component
 * @param {Object} props
 * @param {Object} props.card - Card object with id, type, value, symbol, etc.
 * @param {Function} props.onClick - Function to call when card is clicked
 * @param {boolean} props.isClickable - Whether the card can be clicked
 * @param {string} props.size - Size of the card: "small", "medium", or "large"
 */
const Card = ({ card, onClick, isClickable, size = "medium" }) => {
  const getCardText = () => {
    if (card.type === "number") return card.value
    if (card.type === "alpha") return card.char
    if (card.type === "symbol") return card.symbol
    return "?"
  }

  const getCardIcon = () => {
    if (card.type === "number") return <Hash className="w-4 h-4" />
    if (card.type === "alpha") return <Zap className="w-4 h-4" />
    if (card.symbol === "*") return <Star className="w-4 h-4" />
    if (card.symbol === "$") return <DollarSign className="w-4 h-4" />
    if (card.symbol === "@") return <AtSign className="w-4 h-4" />
    return null
  }

  const handleClick = () => {
    if (isClickable && typeof onClick === "function") {
      onClick(card)
    }
  }

  const cardStyles = {
    number:
      card.value && card.value % 2 === 0
        ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 border-emerald-300"
        : "bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 border-rose-300",
    alpha: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-amber-300",
    symbol: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 border-purple-300",
  }

  const sizeStyles = {
    small: "w-16 h-20 text-lg",
    medium: "w-20 h-28 text-2xl",
    large: "w-24 h-32 text-3xl",
  }

  const getCardDescription = (card) => {
    if (card.type === "number") {
      return card.value % 2 === 0 ? `+${card.value} points (Even)` : `${card.value} points (Odd)`
    }
    if (card.type === "alpha") {
      return `Divide by ${card.value} (${card.char})`
    }
    if (card.symbol === "*") return "Repeat last effect"
    if (card.symbol === "$") return "+10 points"
    if (card.symbol === "@") return "Smart play to 45"
    return "Unknown card"
  }

  return (
    <div
      className={`
        ${sizeStyles[size]}
        ${cardStyles[card.type] || "bg-gradient-to-br from-gray-400 to-gray-600 border-gray-300"}
        rounded-2xl shadow-lg border-2 backdrop-blur-sm
        flex flex-col items-center justify-center
        font-bold text-white relative overflow-hidden
        transition-all duration-300 ease-out
        ${isClickable ? "cursor-pointer hover:scale-105 hover:shadow-xl hover:brightness-110 active:scale-95" : "cursor-default"}
        ${isClickable ? "hover:ring-2 hover:ring-white/50" : ""}
      `}
      onClick={handleClick}
      title={getCardDescription(card)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-2">{getCardIcon()}</div>
        <div className="absolute bottom-2 right-2 rotate-180">{getCardIcon()}</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-1">{getCardIcon()}</div>
        <div className="font-extrabold tracking-wide">{getCardText()}</div>
      </div>

      {/* Shine effect for clickable cards */}
      {isClickable && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
      )}
    </div>
  )
}

export default Card
