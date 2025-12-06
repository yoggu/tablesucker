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
    <div className="border-4 border-black bg-white dark:border-white dark:bg-[#1a1a1a]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div
          className={`border-r-4 border-black p-4 dark:border-white ${redWon ? "bg-[#FF3333]" : ""}`}
        >
          <div className="space-y-1">
            {redTeam.map((player) => (
              <div
                key={player}
                className={`text-sm font-black uppercase ${redWon ? "text-white" : "text-black dark:text-white"}`}
              >
                {player}
              </div>
            ))}
          </div>
          {redWon && (
            <div className="mt-2 inline-block bg-[#FFFF00] px-2 py-0.5 text-xs font-black uppercase text-black">
              WIN
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center border-r-4 border-black bg-black px-6 dark:border-white dark:bg-white">
          <span className="text-4xl font-black text-white dark:text-black">
            {redScore}
          </span>
          <span className="mx-2 text-2xl font-black text-white/50 dark:text-black/50">
            :
          </span>
          <span className="text-4xl font-black text-white dark:text-black">
            {blueScore}
          </span>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#0066FF]" : ""}`}>
          <div className="space-y-1">
            {blueTeam.map((player) => (
              <div
                key={player}
                className={`text-sm font-black uppercase ${!redWon ? "text-white" : "text-black dark:text-white"}`}
              >
                {player}
              </div>
            ))}
          </div>
          {!redWon && (
            <div className="mt-2 inline-block bg-[#FFFF00] px-2 py-0.5 text-xs font-black uppercase text-black">
              WIN
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
