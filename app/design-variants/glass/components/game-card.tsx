interface GameCardProps {
  redTeam: string[];
  blueTeam: string[];
  redScore: number;
  blueScore: number;
}

export function GameCard({
  redTeam,
  blueTeam,
  redScore,
  blueScore,
}: GameCardProps) {
  const redWon = redScore > blueScore;

  return (
    <div className="overflow-hidden rounded-xl border border-white/30 bg-gradient-to-r from-red-500/10 via-white/30 to-blue-500/10 backdrop-blur-sm dark:border-white/10 dark:from-red-500/10 dark:via-white/5 dark:to-blue-500/10">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-4">
        {/* Red Team */}
        <div className={`text-right ${redWon ? "opacity-100" : "opacity-60"}`}>
          <div className="mb-1 space-y-0.5">
            {redTeam.map((player) => (
              <div
                key={player}
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {player}
              </div>
            ))}
          </div>
          {redWon && (
            <span className="inline-block rounded-full bg-gradient-to-r from-amber-400/80 to-yellow-400/80 px-2 py-0.5 text-xs font-semibold text-amber-900 backdrop-blur-sm">
              WIN
            </span>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold backdrop-blur-sm ${
              redWon
                ? "bg-gradient-to-br from-red-500/80 to-pink-500/80 text-white shadow-lg shadow-red-500/30"
                : "bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-300"
            }`}
          >
            {redScore}
          </div>
          <span className="text-2xl font-light text-slate-400 dark:text-slate-500">
            :
          </span>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold backdrop-blur-sm ${
              !redWon
                ? "bg-gradient-to-br from-blue-500/80 to-cyan-500/80 text-white shadow-lg shadow-blue-500/30"
                : "bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
            }`}
          >
            {blueScore}
          </div>
        </div>

        {/* Blue Team */}
        <div className={`text-left ${!redWon ? "opacity-100" : "opacity-60"}`}>
          <div className="mb-1 space-y-0.5">
            {blueTeam.map((player) => (
              <div
                key={player}
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {player}
              </div>
            ))}
          </div>
          {!redWon && (
            <span className="inline-block rounded-full bg-gradient-to-r from-amber-400/80 to-yellow-400/80 px-2 py-0.5 text-xs font-semibold text-amber-900 backdrop-blur-sm">
              WIN
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
