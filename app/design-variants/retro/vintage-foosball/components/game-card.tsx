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
      className="overflow-hidden rounded-lg border-2 border-[#8B7355]"
      style={{
        background: "linear-gradient(to bottom, #4A3728, #3D2914)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-4 ${redWon ? "bg-[#8B0000]/20" : ""}`}>
          <div className="mb-3 font-serif text-xs font-bold uppercase tracking-wider text-[#CD5C5C]">
            Red Team {redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score Display - Brass Plaque Style */}
        <div
          className="flex items-center border-x-2 border-[#8B7355] px-8"
          style={{
            background: "linear-gradient(to bottom, #B8860B, #8B6914)",
          }}
        >
          <div
            className="rounded px-6 py-3 text-center"
            style={{
              background: "linear-gradient(to bottom, #DAA520, #B8860B)",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="font-serif text-5xl font-black text-[#8B0000]"
              style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.3)" }}
            >
              {redScore}
            </div>
            <div
              className="my-1 font-serif text-sm font-bold text-[#3D2914]"
            >
              —
            </div>
            <div
              className="font-serif text-5xl font-black text-[#00008B]"
              style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.3)" }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#00008B]/20" : ""}`}>
          <div className="mb-3 font-serif text-xs font-bold uppercase tracking-wider text-[#6495ED]">
            Blue Team {!redWon && "★"}
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative brass bar */}
      <div
        className="h-2"
        style={{
          background: "linear-gradient(to right, #8B6914, #DAA520, #B8860B, #DAA520, #8B6914)",
        }}
      />
    </div>
  );
}
