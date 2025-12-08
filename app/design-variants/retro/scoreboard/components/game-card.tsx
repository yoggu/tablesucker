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
    <div className="overflow-hidden rounded border-2 border-[#333] bg-[#0A0A0A]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Home Team */}
        <div className={`p-4 ${redWon ? "bg-[#FF0000]/10" : ""}`}>
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF0000]">
            Home {redWon && "●"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score Display - LED Style */}
        <div className="flex items-center border-x-2 border-[#333] bg-[#111] px-8">
          <div className="text-center">
            <div
              className="font-mono text-5xl font-black text-[#FF0000]"
              style={{ textShadow: "0 0 20px rgba(255,0,0,0.8)" }}
            >
              {redScore}
            </div>
            <div className="my-1 font-mono text-xs text-[#444]">—</div>
            <div
              className="font-mono text-5xl font-black text-[#00BFFF]"
              style={{ textShadow: "0 0 20px rgba(0,191,255,0.8)" }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className={`p-4 ${!redWon ? "bg-[#00BFFF]/10" : ""}`}>
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00BFFF]">
            Away {!redWon && "●"}
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
