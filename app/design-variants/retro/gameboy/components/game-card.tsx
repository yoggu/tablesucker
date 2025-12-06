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
    <div className="overflow-hidden border-4 border-[#0F380F] bg-[#8BAC0F] shadow-[4px_4px_0px_0px_#306230] dark:border-[#1a1a2e] dark:bg-[#2d2d44] dark:shadow-[4px_4px_0px_0px_#0a0a14]">
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* Team A */}
        <div className={`p-4 ${redWon ? "bg-[#306230]/30 dark:bg-[#4a4a6a]/30" : ""}`}>
          <div
            className="mb-3 text-[8px] font-bold text-[#0F380F] dark:text-[#9898b8]"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            TEAM A
          </div>
          <div className="flex flex-wrap gap-2">
            {redTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
          {redWon && (
            <div
              className="mt-3 inline-block border-2 border-[#0F380F] bg-[#0F380F] px-2 py-1 text-[8px] font-bold text-[#9BBC0F] dark:border-[#6868a8] dark:bg-[#6868a8] dark:text-[#0a0a14]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              WIN!
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center border-x-4 border-[#0F380F] bg-[#306230] px-6 dark:border-[#1a1a2e] dark:bg-[#4a4a6a]">
          <div className="text-center">
            <div
              className="text-2xl font-bold text-[#9BBC0F] dark:text-[#c8c8d8]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {redScore}
            </div>
            <div
              className="my-1 text-[8px] font-bold text-[#9BBC0F]/70 dark:text-[#c8c8d8]/70"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              VS
            </div>
            <div
              className="text-2xl font-bold text-[#9BBC0F] dark:text-[#c8c8d8]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {blueScore}
            </div>
          </div>
        </div>

        {/* Team B */}
        <div className={`p-4 ${!redWon ? "bg-[#306230]/30 dark:bg-[#4a4a6a]/30" : ""}`}>
          <div
            className="mb-3 text-[8px] font-bold text-[#0F380F] dark:text-[#9898b8]"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            TEAM B
          </div>
          <div className="flex flex-wrap gap-2">
            {blueTeam.map((player) => (
              <PlayerAvatar key={player.id} player={player} showName size="sm" />
            ))}
          </div>
          {!redWon && (
            <div
              className="mt-3 inline-block border-2 border-[#0F380F] bg-[#0F380F] px-2 py-1 text-[8px] font-bold text-[#9BBC0F] dark:border-[#6868a8] dark:bg-[#6868a8] dark:text-[#0a0a14]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              WIN!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
