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
    <div className="border-4 border-[#DC143C] bg-[#FFF0F5] shadow-[4px_4px_0px_0px_#8B0000] dark:border-[#FF6B6B] dark:bg-[#140810] dark:shadow-[4px_4px_0px_0px_#DC143C]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-4 ${redWon ? "bg-[#DC143C]/20" : ""}`}>
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#DC143C] dark:text-[#FF6B6B]">
            Red Team {redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center border-x-4 border-[#DC143C] bg-[#DC143C] px-6 dark:border-[#FF6B6B] dark:bg-[#FF6B6B]">
          <div className="text-center">
            <div className="text-3xl font-black text-white dark:text-[#1a0a0f]">
              {redScore}
            </div>
            <div className="text-xs font-bold text-white/70 dark:text-[#1a0a0f]/70">VS</div>
            <div className="text-3xl font-black text-white dark:text-[#1a0a0f]">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#4169E1]/20" : ""}`}>
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#4169E1] dark:text-[#6495ED]">
            Blue Team {!redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
