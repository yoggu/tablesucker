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
    <div className="overflow-hidden rounded-xl border-2 border-[#2E7D32] bg-[#0D3B0F]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Home Team */}
        <div className={`p-4 ${redWon ? "bg-[#D32F2F]/20" : ""}`}>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#D32F2F] border border-[#F44336]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#EF5350]">
              Home {redWon && "⚽"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score Display - Chalkboard Style */}
        <div
          className="flex items-center border-x-2 border-[#2E7D32] px-8"
          style={{
            background: "linear-gradient(to bottom, #263238, #1C2529)",
          }}
        >
          <div className="text-center">
            <div
              className="text-5xl font-black text-white"
              style={{ fontFamily: "Impact, sans-serif" }}
            >
              {redScore}
            </div>
            <div className="my-1 text-sm font-bold text-[#4CAF50]">-</div>
            <div
              className="text-5xl font-black text-white"
              style={{ fontFamily: "Impact, sans-serif" }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className={`p-4 ${!redWon ? "bg-[#1976D2]/20" : ""}`}>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#1976D2] border border-[#42A5F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#64B5F6]">
              Away {!redWon && "⚽"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Pitch stripe decoration */}
      <div className="flex h-2">
        <div className="flex-1 bg-[#2E7D32]" />
        <div className="flex-1 bg-[#388E3C]" />
        <div className="flex-1 bg-[#2E7D32]" />
        <div className="flex-1 bg-[#388E3C]" />
        <div className="flex-1 bg-[#2E7D32]" />
      </div>
    </div>
  );
}
