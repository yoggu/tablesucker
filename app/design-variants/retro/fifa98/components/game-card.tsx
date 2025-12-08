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
      className="overflow-hidden rounded border-2 border-[#FFD700]"
      style={{
        background: "linear-gradient(180deg, #1E3A5F 0%, #0D1F33 100%)",
      }}
    >
      {/* Match header */}
      <div
        className="flex items-center justify-center py-1 text-xs font-black uppercase tracking-widest text-[#0D1F33]"
        style={{ background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)" }}
      >
        Match Day
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Home Team */}
        <div className={`p-4 ${redWon ? "bg-[#FFD700]/10" : ""}`}>
          <div className="mb-2 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF4444]">
              Home {redWon && "★"}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>

        {/* Score Display - Stadium Board Style */}
        <div
          className="flex items-center border-x-2 border-[#FFD700] px-6"
          style={{ background: "linear-gradient(180deg, #0D1F33 0%, #000 100%)" }}
        >
          <div className="text-center">
            <div
              className="text-5xl font-black text-[#FFD700]"
              style={{
                textShadow: "0 0 20px rgba(255,215,0,0.8)",
                fontFamily: "Impact, sans-serif",
              }}
            >
              {redScore}
            </div>
            <div className="my-2 text-lg font-black text-[#C0C0C0]">VS</div>
            <div
              className="text-5xl font-black text-[#FFD700]"
              style={{
                textShadow: "0 0 20px rgba(255,215,0,0.8)",
                fontFamily: "Impact, sans-serif",
              }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className={`p-4 ${!redWon ? "bg-[#FFD700]/10" : ""}`}>
          <div className="mb-2 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#4444FF]">
              Away {!redWon && "★"}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 w-full bg-[#0D1F33]">
        <div
          className="h-full w-3/4"
          style={{ background: "linear-gradient(90deg, #00FF00, #FFD700)" }}
        />
      </div>
    </div>
  );
}
