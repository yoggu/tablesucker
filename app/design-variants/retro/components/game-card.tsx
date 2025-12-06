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
    <div className="overflow-hidden border-4 border-[#FF6B35] bg-white dark:border-[#39FF14] dark:bg-[#0D1117]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div
          className={`border-r-4 border-[#FF6B35] p-3 dark:border-[#39FF14] ${redWon ? "bg-[#FF6B35]/20 dark:bg-[#39FF14]/10" : ""}`}
        >
          <div className="mb-1 font-mono text-xs font-bold text-[#FF6B35] dark:text-[#FF69B4]">
            TEAM_RED:
          </div>
          {redTeam.map((player) => (
            <div
              key={player}
              className="font-mono text-sm text-slate-700 dark:text-[#39FF14]/80"
            >
              &gt; {player}
            </div>
          ))}
          {redWon && (
            <div className="mt-2 inline-block border-2 border-[#FFD700] bg-[#FFD700] px-2 py-0.5 font-mono text-xs font-bold text-black">
              *WIN*
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center border-r-4 border-[#FF6B35] bg-[#FF6B35] px-4 dark:border-[#39FF14] dark:bg-[#39FF14]">
          <div className="text-center font-mono">
            <div className="text-3xl font-bold text-white dark:text-black">
              {redScore}
            </div>
            <div className="text-xs text-white/70 dark:text-black/70">VS</div>
            <div className="text-3xl font-bold text-white dark:text-black">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div
          className={`p-3 ${!redWon ? "bg-[#00CED1]/20 dark:bg-[#00BFFF]/10" : ""}`}
        >
          <div className="mb-1 font-mono text-xs font-bold text-[#00CED1] dark:text-[#00BFFF]">
            TEAM_BLUE:
          </div>
          {blueTeam.map((player) => (
            <div
              key={player}
              className="font-mono text-sm text-slate-700 dark:text-[#39FF14]/80"
            >
              &gt; {player}
            </div>
          ))}
          {!redWon && (
            <div className="mt-2 inline-block border-2 border-[#FFD700] bg-[#FFD700] px-2 py-0.5 font-mono text-xs font-bold text-black">
              *WIN*
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
