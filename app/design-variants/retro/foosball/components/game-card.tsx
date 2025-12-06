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
    <div className="overflow-hidden rounded-lg border-4 border-[#5D4037] shadow-[0_4px_12px_rgba(0,0,0,0.3)] dark:border-[#3E2723] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
      {/* Green felt playing field */}
      <div
        className="relative bg-[#2E7D32] dark:bg-[#1B5E20]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='felt'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23felt)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Field lines */}
        <div className="pointer-events-none absolute inset-0">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-white/30" />
          {/* Goal areas */}
          <div className="absolute left-0 top-1/4 h-1/2 w-4 border-r-2 border-white/30" />
          <div className="absolute right-0 top-1/4 h-1/2 w-4 border-l-2 border-white/30" />
        </div>

        <div className="relative grid grid-cols-[1fr_auto_1fr]">
          {/* Red Team */}
          <div className={`p-4 ${redWon ? "bg-[#E53935]/20" : ""}`}>
            <div className="mb-3 flex items-center gap-2">
              {/* Foosball player figure icon */}
              <div className="flex h-6 w-4 items-center justify-center rounded-sm bg-[#E53935] shadow-md">
                <div className="h-2 w-2 rounded-full bg-[#FFCDD2]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Red Team
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {redTeam.map((player) => (
                <PlayerAvatar key={player.id} player={player} showName size="sm" />
              ))}
            </div>
            {redWon && (
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA000] px-3 py-1 text-xs font-bold uppercase text-[#5D4037] shadow-md">
                <span>⚽</span> Winner!
              </div>
            )}
          </div>

          {/* Score - Metal scoreboard style */}
          <div className="flex items-center border-x-4 border-[#5D4037]/50 bg-gradient-to-b from-[#8D6E63] to-[#6D4C41] px-6 dark:border-[#3E2723]/50 dark:from-[#4E342E] dark:to-[#3E2723]">
            <div className="text-center">
              <div className="rounded-md bg-[#1A1A1A] px-4 py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="font-mono text-4xl font-black text-[#E53935]">
                  {redScore}
                </div>
              </div>
              <div className="my-2 text-sm font-bold text-white/60">VS</div>
              <div className="rounded-md bg-[#1A1A1A] px-4 py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="font-mono text-4xl font-black text-[#1E88E5]">
                  {blueScore}
                </div>
              </div>
            </div>
          </div>

          {/* Blue Team */}
          <div className={`p-4 ${!redWon ? "bg-[#1E88E5]/20" : ""}`}>
            <div className="mb-3 flex items-center justify-end gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Blue Team
              </span>
              {/* Foosball player figure icon */}
              <div className="flex h-6 w-4 items-center justify-center rounded-sm bg-[#1E88E5] shadow-md">
                <div className="h-2 w-2 rounded-full bg-[#BBDEFB]" />
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {blueTeam.map((player) => (
                <PlayerAvatar key={player.id} player={player} showName size="sm" />
              ))}
            </div>
            {!redWon && (
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA000] px-3 py-1 text-xs font-bold uppercase text-[#5D4037] shadow-md">
                <span>⚽</span> Winner!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
