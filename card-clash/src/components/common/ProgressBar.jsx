import { Target } from "lucide-react"

/**
 * ProgressBar Component
 * @param {Object} props
 * @param {number} props.score - Current score
 * @param {number} props.target - Target score to reach
 */
const ProgressBar = ({ score, target }) => {
  const percentage = Math.min((score / target) * 100, 100)
  const isNearTarget = score >= target * 0.8
  const isOverTarget = score > target

  return (
    <div className="mb-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
        {/* Score Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-semibold">Progress to Victory</span>
          </div>
          <div className="text-right">
            <div
              className={`text-3xl font-bold ${isOverTarget ? "text-red-400" : isNearTarget ? "text-yellow-400" : "text-blue-400"}`}
            >
              {score}
            </div>
            <div className="text-slate-400 text-sm">/ {target} points</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${
                isOverTarget
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : isNearTarget
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : "bg-gradient-to-r from-blue-400 to-blue-600"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Target Line */}
          <div className="absolute top-0 right-0 w-1 h-4 bg-white/50 rounded-full" />
        </div>

        {/* Status Message */}
        <div className="mt-3 text-center">
          {isOverTarget ? (
            <span className="text-red-400 font-semibold">Over target! Game ends at 45+</span>
          ) : isNearTarget ? (
            <span className="text-yellow-400 font-semibold">Almost there! {target - score} points to go</span>
          ) : (
            <span className="text-slate-400">{target - score} points needed to win</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
