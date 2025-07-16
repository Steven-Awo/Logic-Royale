import { Bot, Crown, Cpu, Brain, Target, Swords, Skull } from "lucide-react"

/**
 * ComputerOpponent Component
 * @param {Object} props
 * @param {Array} props.hand - Array of cards in computer's hand
 * @param {boolean} props.isActive - Whether it's currently the computer's turn
 * @param {boolean} props.winner - Whether the computer has won
 * @param {string} props.difficulty - Current difficulty level
 */
const ComputerOpponent = ({ hand, isActive, winner, difficulty }) => {
  const getDifficultyIcon = () => {
    switch (difficulty) {
      case "beginner":
        return <Brain className="w-4 h-4" />
      case "intermediate":
        return <Target className="w-4 h-4" />
      case "advanced":
        return <Swords className="w-4 h-4" />
      case "nightmare":
        return <Skull className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400 border-green-400"
      case "intermediate":
        return "text-blue-400 border-blue-400"
      case "advanced":
        return "text-orange-400 border-orange-400"
      case "nightmare":
        return "text-red-400 border-red-400"
      default:
        return "text-blue-400 border-blue-400"
    }
  }

  const getThinkingMessage = () => {
    switch (difficulty) {
      case "beginner":
        return "Thinking..."
      case "intermediate":
        return "Calculating..."
      case "advanced":
        return "Strategizing..."
      case "nightmare":
        return "Analyzing..."
      default:
        return "Thinking..."
    }
  }

  return (
    <div className="mb-8">
      {/* Computer Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={`p-2 rounded-full ${winner ? "bg-yellow-500" : isActive ? "bg-red-500" : "bg-slate-600"}`}>
          {winner ? <Crown className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Computer Opponent
            {winner && <span className="text-yellow-400 ml-2">👑</span>}
          </h2>
          <div className={`flex items-center justify-center gap-1 text-sm ${getDifficultyColor().split(" ")[0]}`}>
            {getDifficultyIcon()}
            <span className="capitalize">{difficulty} AI</span>
          </div>
        </div>
        {isActive && !winner && (
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            {getThinkingMessage()}
          </div>
        )}
      </div>

      {/* Computer Cards */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-6 border border-slate-600/30">
        <div className="flex justify-center items-center gap-3">
          {hand.map((_, index) => (
            <div
              key={index}
              className={`
                w-16 h-20 rounded-xl border-2 border-slate-500
                bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900
                flex items-center justify-center text-slate-400
                transition-all duration-300
                ${isActive ? `animate-pulse ${getDifficultyColor().split(" ")[1]}` : ""}
              `}
            >
              <Cpu className="w-6 h-6" />
            </div>
          ))}
        </div>

        {/* Hand Count */}
        <div className="text-center mt-4 text-slate-400">
          <span className="text-sm">
            {hand.length} card{hand.length !== 1 ? "s" : ""} remaining
          </span>
        </div>
      </div>
    </div>
  )
}

export default ComputerOpponent
