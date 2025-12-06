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
    <div className="overflow-hidden rounded-xl border border-[#45475A] bg-[#313244]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team - using Catppuccin Red */}
        <div className={`p-4 ${redWon ? "bg-[#F38BA8]/10" : ""}`}>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#F38BA8]">
            Red Team {redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center border-x border-[#45475A] bg-[#1E1E2E] px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#CDD6F4]">
              {redScore}
            </div>
            <div className="text-xs text-[#6C7086]">vs</div>
            <div className="text-2xl font-bold text-[#CDD6F4]">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team - using Catppuccin Blue */}
        <div className={`p-4 ${!redWon ? "bg-[#89B4FA]/10" : ""}`}>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#89B4FA]">
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
