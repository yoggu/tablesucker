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
    <div
      className="overflow-hidden rounded-xl border-2 border-[#8B4513] bg-gradient-to-b from-[#1A0F0A] to-[#0D0705]"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Home Team */}
        <div className={`p-4 ${redWon ? "bg-[#DC143C]/15" : ""}`}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC143C]">
              Home {redWon && "🏆"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score Display - Chalkboard Style */}
        <div className="flex items-center bg-[#2F4F2F] px-8 border-x-2 border-[#8B4513]">
          <div
            className="text-center px-4 py-2 rounded-lg"
            style={{
              background: "linear-gradient(to bottom, #1a3a1a, #0d1f0d)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="text-5xl font-black text-[#DC143C]"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontFamily: "Impact, sans-serif",
              }}
            >
              {redScore}
            </div>
            <div className="my-1 text-sm font-bold text-[#F5E6D3]/50">VS</div>
            <div
              className="text-5xl font-black text-[#4169E1]"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontFamily: "Impact, sans-serif",
              }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className={`p-4 ${!redWon ? "bg-[#4169E1]/15" : ""}`}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4169E1]">
              Away {!redWon && "🏆"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar with beer mug decoration */}
      <div className="flex items-center justify-center gap-4 border-t-2 border-[#8B4513] bg-[#1A0F0A] py-2 text-lg">
        <span>🍺</span>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B4513]">
          Game Night
        </span>
        <span>🍺</span>
      </div>
    </div>
  );
}
