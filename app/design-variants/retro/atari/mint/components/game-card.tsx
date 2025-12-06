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
    <div className="border-4 border-[#20B2AA] bg-[#F0FFFF] shadow-[4px_4px_0px_0px_#008B8B] dark:border-[#40E0D0] dark:bg-[#0a1414] dark:shadow-[4px_4px_0px_0px_#20B2AA]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-4 ${redWon ? "bg-[#FF6B6B]/20" : ""}`}>
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#FF6B6B]">
            Red Team {redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center border-x-4 border-[#20B2AA] bg-[#20B2AA] px-6 dark:border-[#40E0D0] dark:bg-[#40E0D0]">
          <div className="text-center">
            <div className="text-3xl font-black text-white dark:text-[#0f1a1a]">
              {redScore}
            </div>
            <div className="text-xs font-bold text-white/70 dark:text-[#0f1a1a]/70">VS</div>
            <div className="text-3xl font-black text-white dark:text-[#0f1a1a]">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#40E0D0]/20" : ""}`}>
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#008B8B] dark:text-[#40E0D0]">
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
