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
      className="overflow-hidden rounded-none border-4 border-[#000] bg-[#3A6F19]"
      style={{ boxShadow: "4px 4px 0 #000" }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-3 ${redWon ? "bg-[#FF0000]/30" : ""}`}>
          <div className="mb-2 font-mono text-xs font-bold uppercase text-[#FF0000]">
            Red {redWon && "*"}
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score Display - Pixel Style */}
        <div className="flex items-center border-x-4 border-[#000] bg-[#000] px-6">
          <div className="text-center">
            <div
              className="font-mono text-5xl font-black text-[#FF0000]"
              style={{ textShadow: "2px 2px 0 #800000" }}
            >
              {redScore}
            </div>
            <div className="my-1 font-mono text-sm font-bold text-[#FFFF00]">-</div>
            <div
              className="font-mono text-5xl font-black text-[#0000FF]"
              style={{ textShadow: "2px 2px 0 #000080" }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-3 ${!redWon ? "bg-[#0000FF]/30" : ""}`}>
          <div className="mb-2 font-mono text-xs font-bold uppercase text-[#0000FF]">
            Blue {!redWon && "*"}
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Pixel pitch lines */}
      <div className="flex h-2 bg-[#5A8F29]">
        <div className="w-1/5 border-r-2 border-white" />
        <div className="w-3/5 border-x-2 border-white" />
        <div className="w-1/5 border-l-2 border-white" />
      </div>
    </div>
  );
}
