"use client"
import Card from "./Card"
import { Plus, Layers } from "lucide-react"

/**
 * GameCenter Component
 * @param {Object} props
 * @param {Array} props.playedCards - Array of cards that have been played
 * @param {Array} props.drawPile - Array of cards in the draw pile
 * @param {string} props.turn - Current turn ("player" or "computer")
 * @param {Function} props.onDraw - Function to call when draw button is clicked
 * @param {boolean} props.canDraw - Whether the player can draw a card
 */
const GameCenter = ({ playedCards, drawPile, turn, onDraw, canDraw }) => {
  const lastPlayedCard = playedCards[playedCards.length - 1]

  return (
    <div className="my-8">
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/40">
        <div className="flex items-center justify-center gap-8">
          {/* Draw Pile */}
          <div className="text-center">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 justify-center">
                <Layers className="w-5 h-5" />
                Draw Pile
              </h3>
            </div>
            <div className="relative">
              {/* Stack effect */}
              <div className="absolute inset-0 bg-slate-700 rounded-xl transform rotate-1 opacity-50"></div>
              <div className="absolute inset-0 bg-slate-600 rounded-xl transform -rotate-1 opacity-30"></div>

              <button
                onClick={onDraw}
                disabled={!canDraw || drawPile.length === 0}
                className={`
                  relative w-20 h-28 rounded-xl border-2 border-dashed
                  flex flex-col items-center justify-center
                  transition-all duration-300 font-semibold
                  ${
                    canDraw && drawPile.length > 0
                      ? "border-blue-400 bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer hover:scale-105"
                      : "border-slate-500 bg-slate-700/50 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-xs">Draw</span>
              </button>
            </div>
            <div className="mt-2 text-sm text-slate-400">{drawPile.length} cards</div>
          </div>

          {/* VS Indicator */}
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-400 mb-2">VS</div>
            <div className="text-sm text-slate-500">Turn: {turn === "player" ? "You" : "Computer"}</div>
          </div>

          {/* Last Played Card */}
          <div className="text-center">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-slate-300">Last Played</h3>
            </div>
            <div className="relative">
              {lastPlayedCard ? (
                <div className="transform hover:scale-105 transition-transform">
                  <Card card={lastPlayedCard} isClickable={false} size="medium" />
                </div>
              ) : (
                <div className="w-20 h-28 rounded-xl border-2 border-dashed border-slate-500 bg-slate-700/30 flex items-center justify-center">
                  <span className="text-slate-500 text-sm">Empty</span>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-slate-400">{playedCards.length} played</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCenter
