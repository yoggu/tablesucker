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
    <div className="overflow-hidden border-4 border-[#00DDFF] bg-[#0a1628]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-4 ${redWon ? "bg-[#0088FF]/20" : ""}`}>
          <div className="mb-3 text-xs font-black uppercase tracking-wide text-red-400">
            Team Red
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
          {redWon && (
            <div className="mt-3 inline-block border-2 border-[#00DDFF] bg-[#00DDFF] px-3 py-1 text-xs font-black text-[#0a1628]">
              WINNER
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center bg-[#0088FF] px-6">
          <div className="text-center">
            <div className="text-4xl font-black text-white">{redScore}</div>
            <div className="my-1 text-sm font-bold text-white/70">vs</div>
            <div className="text-4xl font-black text-white">{blueScore}</div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#0088FF]/20" : ""}`}>
          <div className="mb-3 text-xs font-black uppercase tracking-wide text-blue-400">
            Team Blue
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
          {!redWon && (
            <div className="mt-3 inline-block border-2 border-[#00DDFF] bg-[#00DDFF] px-3 py-1 text-xs font-black text-[#0a1628]">
              WINNER
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
