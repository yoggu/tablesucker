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
    <div className="overflow-hidden rounded-2xl border-2 border-purple-100 bg-gradient-to-r from-red-50 via-white to-blue-50 dark:border-purple-900/30 dark:from-red-950/30 dark:via-[#2D2640] dark:to-blue-950/30">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-4">
        {/* Red Team */}
        <div className={`text-right ${redWon ? "opacity-100" : "opacity-60"}`}>
          <div className="mb-1 space-y-0.5">
            {redTeam.map((player) => (
              <div
                key={player}
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {player}
              </div>
            ))}
          </div>
          {redWon && (
            <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-0.5 text-xs font-bold text-slate-900">
              WIN
            </span>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ${
              redWon
                ? "bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-lg shadow-red-300/50 dark:shadow-red-900/50"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {redScore}
          </div>
          <span className="text-2xl font-light text-slate-300 dark:text-slate-600">
            :
          </span>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ${
              !redWon
                ? "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-300/50 dark:shadow-blue-900/50"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
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
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {player}
              </div>
            ))}
          </div>
          {!redWon && (
            <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-0.5 text-xs font-bold text-slate-900">
              WIN
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
