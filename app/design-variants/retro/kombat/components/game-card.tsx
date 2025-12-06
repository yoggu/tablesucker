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
    <div className="overflow-hidden border-4 border-[#FFD700] bg-[#0a0a0a]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team - Player 1 */}
        <div className={`p-4 ${redWon ? "bg-gradient-to-r from-[#8B0000]/50 to-transparent" : ""}`}>
          <div className="mb-2 text-center text-xs font-black uppercase tracking-widest text-[#FF4500]">
            PLAYER 1
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="md" />
            ))}
          </div>
          {redWon && (
            <div className="mt-3 text-center">
              <span className="inline-block animate-pulse bg-gradient-to-r from-[#FFD700] to-[#FF4500] bg-clip-text text-sm font-black uppercase text-transparent">
                VICTORY
              </span>
            </div>
          )}
        </div>

        {/* Score - VS */}
        <div className="flex items-center bg-gradient-to-b from-[#8B0000] via-[#4a0000] to-[#8B0000] px-6">
          <div className="text-center">
            <div className="text-3xl font-black text-[#FFD700] [text-shadow:0_0_10px_#FF4500]">
              {redScore}
            </div>
            <div className="my-2 text-xl font-black text-[#FF4500] [text-shadow:0_0_10px_#FF4500]">
              VS
            </div>
            <div className="text-3xl font-black text-[#FFD700] [text-shadow:0_0_10px_#FF4500]">
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team - Player 2 */}
        <div className={`p-4 ${!redWon ? "bg-gradient-to-l from-[#000080]/50 to-transparent" : ""}`}>
          <div className="mb-2 text-center text-xs font-black uppercase tracking-widest text-[#00BFFF]">
            PLAYER 2
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} size="md" />
            ))}
          </div>
          {!redWon && (
            <div className="mt-3 text-center">
              <span className="inline-block animate-pulse bg-gradient-to-r from-[#FFD700] to-[#FF4500] bg-clip-text text-sm font-black uppercase text-transparent">
                VICTORY
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
