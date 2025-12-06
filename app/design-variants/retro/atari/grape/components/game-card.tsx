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
    <div className="border-4 border-[#9370DB] bg-[#F8F4FF] shadow-[4px_4px_0px_0px_#6A5ACD] dark:border-[#DDA0DD] dark:bg-[#100814] dark:shadow-[4px_4px_0px_0px_#9370DB]">
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
        <div className="flex items-center border-x-4 border-[#9370DB] bg-[#9370DB] px-6 dark:border-[#DDA0DD] dark:bg-[#DDA0DD]">
          <div className="text-center">
            <div className="text-3xl font-black text-white dark:text-[#150a1a]">
              {redScore}
            </div>
            <div className="text-xs font-bold text-white/70 dark:text-[#150a1a]/70">VS</div>
            <div className="text-3xl font-black text-white dark:text-[#150a1a]">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#20B2AA]/20" : ""}`}>
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#20B2AA] dark:text-[#40E0D0]">
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
