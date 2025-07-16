"use client"
import Card from "./Card"
import { User, Crown } from "lucide-react"

/**
 * PlayerHand Component
 * @param {Object} props
 * @param {Array} props.hand - Array of card objects in player's hand
 * @param {Function} props.onCardPlay - Function to call when a card is played
 * @param {boolean} props.isPlayerTurn - Whether it's currently the player's turn
 * @param {boolean} props.winner - Whether the player has won
 */
const PlayerHand = ({ hand, onCardPlay, isPlayerTurn, winner }) => {
  return (
    <div className="mt-8">
      {/* Player Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={`p-2 rounded-full ${winner ? "bg-yellow-500" : isPlayerTurn ? "bg-blue-500" : "bg-slate-600"}`}>
          {winner ? <Crown className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
        </div>
        <h2 className="text-2xl font-bold">
          Your Hand
          {winner && <span className="text-yellow-400 ml-2">👑</span>}
        </h2>
        {isPlayerTurn && !winner && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            Your Turn
          </div>
        )}
      </div>

      {/* Cards Container */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-600/50">
        {hand.length > 0 ? (
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {hand.map((card, index) => (
              <div
                key={card.id}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Card card={card} onClick={onCardPlay} isClickable={isPlayerTurn && !winner} size="medium" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-slate-400 text-lg">No cards in hand</div>
            <div className="text-slate-500 text-sm mt-1">Draw a card to continue</div>
          </div>
        )}
      </div>

      {/* Hand Info */}
      <div className="text-center mt-4 text-slate-400">
        <span className="text-sm">
          {hand.length} card{hand.length !== 1 ? "s" : ""} remaining
        </span>
      </div>
    </div>
  )
}

export default PlayerHand
