import { PlayerAvatar, DemoPlayer } from "./player-avatar";

interface GameCardProps {
  redTeam: DemoPlayer[];
  blueTeam: DemoPlayer[];
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
    <div className="overflow-hidden border-4 border-[#006400] bg-white dark:border-[#39FF14] dark:bg-[#0a0a0a]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div
          className={`border-r-4 border-[#006400] p-3 dark:border-[#39FF14] ${redWon ? "bg-[#006400]/10 dark:bg-[#39FF14]/5" : ""}`}
        >
          <div className="mb-2 font-mono text-xs font-bold text-red-600 dark:text-red-400">
            TEAM_RED:
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="sm" />
            ))}
          </div>
          {redWon && (
            <div className="mt-2 inline-block border-2 border-[#006400] bg-[#006400] px-2 py-0.5 font-mono text-xs font-bold text-white dark:border-[#39FF14] dark:bg-[#39FF14] dark:text-black">
              WINNER
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center border-r-4 border-[#006400] bg-[#006400] px-4 dark:border-[#39FF14] dark:bg-[#39FF14]">
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
          className={`p-3 ${!redWon ? "bg-[#006400]/10 dark:bg-[#39FF14]/5" : ""}`}
        >
          <div className="mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            TEAM_BLUE:
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="sm" />
            ))}
          </div>
          {!redWon && (
            <div className="mt-2 inline-block border-2 border-[#006400] bg-[#006400] px-2 py-0.5 font-mono text-xs font-bold text-white dark:border-[#39FF14] dark:bg-[#39FF14] dark:text-black">
              WINNER
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
