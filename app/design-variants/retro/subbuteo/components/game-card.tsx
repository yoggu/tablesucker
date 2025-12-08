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
      className="overflow-hidden rounded-xl border-4 border-white"
      style={{
        background: "linear-gradient(to bottom, #4A7C23, #2D5016)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)",
      }}
    >
      {/* Pitch markings */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-2 border-white/30" />
        </div>
        <div className="absolute left-0 top-1/2 h-20 w-8 -translate-y-1/2 rounded-r-lg border-2 border-l-0 border-white/30" />
        <div className="absolute right-0 top-1/2 h-20 w-8 -translate-y-1/2 rounded-l-lg border-2 border-r-0 border-white/30" />

        <div className="grid grid-cols-[1fr_auto_1fr]">
          {/* Red Team */}
          <div className={`p-4 ${redWon ? "bg-white/10" : ""}`}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#C41E3A] border border-[#8B0000]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Red {redWon && "★"}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {redTeam.map((player) => (
                <PlayerAvatar key={player.id} player={player} size="sm" />
              ))}
            </div>
          </div>

          {/* Score Display */}
          <div
            className="flex items-center border-x-2 border-white/20 px-8"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            <div className="text-center">
              <div
                className="text-5xl font-black text-white"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
              >
                {redScore}
              </div>
              <div className="my-2">
                <div className="mx-auto h-3 w-3 rounded-full bg-white shadow-md" />
              </div>
              <div
                className="text-5xl font-black text-white"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
              >
                {blueScore}
              </div>
            </div>
          </div>

          {/* Blue Team */}
          <div className={`p-4 ${!redWon ? "bg-white/10" : ""}`}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#1E90FF] border border-[#0066CC]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Blue {!redWon && "★"}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {blueTeam.map((player) => (
                <PlayerAvatar key={player.id} player={player} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
