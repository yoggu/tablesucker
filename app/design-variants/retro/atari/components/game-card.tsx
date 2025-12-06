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
    <div className="overflow-hidden border-4 border-[#FF6600] bg-black dark:border-[#FFCC00]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-3 ${redWon ? "bg-[#FF6600]/20" : ""}`}>
          <div className="mb-2 text-center text-xs font-black uppercase tracking-widest text-red-500 dark:text-red-400">
            ◄ P1 TEAM ►
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="sm" />
            ))}
          </div>
          {redWon && (
            <div className="mt-2 text-center text-xs font-black text-[#FF6600] dark:text-[#FFCC00]">
              ★ WINNER ★
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center bg-[#FF6600] px-6 dark:bg-[#FFCC00]">
          <div className="text-center">
            <div className="text-4xl font-black text-white dark:text-black">
              {redScore}
            </div>
            <div className="my-1 text-xs font-bold text-white/70 dark:text-black/70">
              VS
            </div>
            <div className="text-4xl font-black text-white dark:text-black">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-3 ${!redWon ? "bg-[#0066FF]/20" : ""}`}>
          <div className="mb-2 text-center text-xs font-black uppercase tracking-widest text-blue-500 dark:text-blue-400">
            ◄ P2 TEAM ►
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="sm" />
            ))}
          </div>
          {!redWon && (
            <div className="mt-2 text-center text-xs font-black text-[#FF6600] dark:text-[#FFCC00]">
              ★ WINNER ★
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
