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
    <div className="overflow-hidden rounded-lg border border-[#54546D] bg-[#2A2A37]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team - using Kanagawa's winter red */}
        <div className={`p-4 ${redWon ? "bg-[#C34043]/10" : ""}`}>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#C34043]">
            Red Team {redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center border-x border-[#54546D] bg-[#1F1F28] px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#DCD7BA]">
              {redScore}
            </div>
            <div className="text-xs text-[#727169]">vs</div>
            <div className="text-2xl font-bold text-[#DCD7BA]">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team - using Kanagawa's wave blue */}
        <div className={`p-4 ${!redWon ? "bg-[#7E9CD8]/10" : ""}`}>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#7E9CD8]">
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
