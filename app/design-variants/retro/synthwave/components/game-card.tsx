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
    <div className="overflow-hidden rounded-lg border-2 border-[#FF00FF]/50 bg-gradient-to-r from-[#FF00FF]/5 via-transparent to-[#00FFFF]/5 dark:border-[#FF00FF] dark:from-[#FF00FF]/10 dark:via-[#1a0533] dark:to-[#00FFFF]/10 dark:shadow-[0_0_15px_rgba(255,0,255,0.2)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Red Team */}
        <div className={`p-4 ${redWon ? "bg-[#FF00FF]/10" : ""}`}>
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF1493] dark:text-[#FF00FF]">
            Team Red
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="sm" />
            ))}
          </div>
          {redWon && (
            <div className="mt-2 inline-block rounded bg-gradient-to-r from-[#FF00FF] to-[#FF1493] px-2 py-0.5 text-xs font-bold text-white dark:shadow-[0_0_10px_rgba(255,0,255,0.5)]">
              WINNER
            </div>
          )}
        </div>

        {/* Score */}
        <div className="bg-gradient-to-b from-[#FF00FF] to-[#00FFFF] px-6 py-4 dark:shadow-[0_0_20px_rgba(255,0,255,0.5)]">
          <div className="text-center">
            <div className="text-3xl font-black text-white drop-shadow-lg">
              {redScore}
            </div>
            <div className="my-1 text-xs font-bold text-white/70">VS</div>
            <div className="text-3xl font-black text-white drop-shadow-lg">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#00FFFF]/10" : ""}`}>
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00CED1] dark:text-[#00FFFF]">
            Team Blue
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="sm" />
            ))}
          </div>
          {!redWon && (
            <div className="mt-2 inline-block rounded bg-gradient-to-r from-[#00FFFF] to-[#00CED1] px-2 py-0.5 text-xs font-bold text-black dark:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              WINNER
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
