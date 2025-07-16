"use client"

import { Brain, Zap, Skull, Play, Trophy, Target, Swords } from "lucide-react"

/**
 * DifficultySelection Component
 * @param {Object} props
 * @param {Function} props.onDifficultySelect - Function to call when difficulty is selected
 */
const DifficultySelection = ({ onDifficultySelect }) => {
  const difficulties = [
    {
      id: "beginner",
      name: "Beginner",
      description: "Perfect for learning the game mechanics",
      icon: Brain,
      color: "from-green-400 to-green-600",
      borderColor: "border-green-400",
      features: ["Favorable card distribution", "Computer plays randomly", "Extra hints and guidance"],
      winRate: "High chance of winning",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      description: "Balanced gameplay for casual players",
      icon: Target,
      color: "from-blue-400 to-blue-600",
      borderColor: "border-blue-400",
      features: ["Balanced card distribution", "Smart computer decisions", "Standard game rules"],
      winRate: "Fair chance of winning",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Challenging gameplay for experienced players",
      icon: Swords,
      color: "from-orange-400 to-orange-600",
      borderColor: "border-orange-400",
      features: ["Strategic computer AI", "Fewer favorable cards", "Complex decision making"],
      winRate: "Requires skill to win",
    },
    {
      id: "nightmare",
      name: "Nightmare",
      description: "Ultimate challenge for masters only",
      icon: Skull,
      color: "from-red-500 to-red-700",
      borderColor: "border-red-500",
      features: ["Optimal computer play", "Disadvantageous cards", "Maximum difficulty"],
      winRate: "Very low chance of winning",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Logic Royale
            </h1>
          </div>
          <p className="text-slate-300 text-xl mb-2">Race to 45 points with strategic card play</p>
          <p className="text-slate-400 text-lg">Choose your challenge level</p>
        </header>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {difficulties.map((difficulty, index) => {
            const IconComponent = difficulty.icon
            return (
              <div
                key={difficulty.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => onDifficultySelect(difficulty.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`
                  bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border-2 ${difficulty.borderColor}
                  hover:bg-slate-700/50 transition-all duration-300
                  hover:shadow-2xl hover:shadow-${difficulty.color.split("-")[1]}-500/20
                `}
                >
                  {/* Icon and Title */}
                  <div className="text-center mb-4">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${difficulty.color} mb-3`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{difficulty.name}</h3>
                    <p className="text-slate-300 text-sm">{difficulty.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {difficulty.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Win Rate */}
                  <div className="text-center mb-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Win Rate</div>
                    <div className="text-sm font-semibold text-slate-300">{difficulty.winRate}</div>
                  </div>

                  {/* Play Button */}
                  <button
                    className={`
                    w-full bg-gradient-to-r ${difficulty.color} hover:brightness-110
                    text-white font-semibold py-3 px-4 rounded-xl
                    transition-all duration-200 flex items-center justify-center gap-2
                    group-hover:shadow-lg
                  `}
                  >
                    <Play className="w-4 h-4" />
                    Start Game
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Game Rules */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30">
          <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            How to Play
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-emerald-500/20 p-4 rounded-2xl mb-3 inline-block">
                <div className="text-2xl font-bold text-emerald-400">45</div>
              </div>
              <h3 className="font-semibold mb-2">Reach the Target</h3>
              <p className="text-slate-400 text-sm">Be the first to reach exactly 45 points to win the game</p>
            </div>
            <div>
              <div className="bg-blue-500/20 p-4 rounded-2xl mb-3 inline-block">
                <div className="text-2xl font-bold text-blue-400">🎴</div>
              </div>
              <h3 className="font-semibold mb-2">Strategic Cards</h3>
              <p className="text-slate-400 text-sm">
                Number cards add/subtract points, letters divide, symbols have special effects
              </p>
            </div>
            <div>
              <div className="bg-purple-500/20 p-4 rounded-2xl mb-3 inline-block">
                <div className="text-2xl font-bold text-purple-400">🧠</div>
              </div>
              <h3 className="font-semibold mb-2">Think Ahead</h3>
              <p className="text-slate-400 text-sm">Plan your moves carefully - every card choice matters!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DifficultySelection
