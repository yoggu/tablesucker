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
    <div className="overflow-hidden rounded-sm border-3 border-[#5D3A1A] bg-[#FDF8F0] shadow-[3px_3px_0_#5D3A1A] dark:border-[#D4A574]/30 dark:bg-[#0D0804] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Red Team */}
        <div className={`p-4 ${redWon ? "bg-[#C41E3A]/10 dark:bg-[#8B2500]/20" : ""}`}>
          <div className="mb-3 font-serif text-xs font-bold uppercase tracking-wide text-[#C41E3A] dark:text-[#8B2500]">
            Red Team
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
          {redWon && (
            <div className="mt-3 inline-block rounded-sm border-2 border-[#8B0A1A] bg-[#DAA520] px-3 py-1 font-serif text-xs font-bold italic text-[#5D3A1A] shadow-[2px_2px_0_#5D3A1A] dark:border-[#DAA520] dark:bg-gradient-to-r dark:from-[#DAA520] dark:to-[#8B4513] dark:text-[#1A1008] dark:shadow-[0_0_10px_rgba(218,165,32,0.4)]">
              Winner!
            </div>
          )}
        </div>

        {/* Score - Vintage scoreboard style */}
        <div className="flex items-center bg-gradient-to-b from-[#5D3A1A] to-[#3D2A1A] px-6 dark:border-x-2 dark:border-[#D4A574]/20 dark:from-[#2A1A08] dark:to-[#1A1008]">
          <div className="text-center">
            <div
              className="font-serif text-4xl font-black text-[#DAA520] dark:text-[#D4A574]"
              style={{ textShadow: '2px 2px 0 #3D2A1A' }}
            >
              {redScore}
            </div>
            <div className="my-1 font-serif text-sm italic text-[#D4A574] dark:text-[#8B4513]">vs</div>
            <div
              className="font-serif text-4xl font-black text-[#DAA520] dark:text-[#D4A574]"
              style={{ textShadow: '2px 2px 0 #3D2A1A' }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Blue Team */}
        <div className={`p-4 ${!redWon ? "bg-[#1E5631]/10 dark:bg-[#1A5631]/20" : ""}`}>
          <div className="mb-3 font-serif text-xs font-bold uppercase tracking-wide text-[#1E5631] dark:text-[#1A8B50]">
            Blue Team
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
          {!redWon && (
            <div className="mt-3 inline-block rounded-sm border-2 border-[#0D3318] bg-[#DAA520] px-3 py-1 font-serif text-xs font-bold italic text-[#5D3A1A] shadow-[2px_2px_0_#5D3A1A] dark:border-[#DAA520] dark:bg-gradient-to-r dark:from-[#DAA520] dark:to-[#8B4513] dark:text-[#1A1008] dark:shadow-[0_0_10px_rgba(218,165,32,0.4)]">
              Winner!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
