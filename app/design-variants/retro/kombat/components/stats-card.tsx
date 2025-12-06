import { Card } from "./card";
import { PlayerAvatar, DemoPlayer } from "./player-avatar";

interface StatsItem {
  player: DemoPlayer;
  value: string;
  highlight?: boolean;
}

interface StatsCardProps {
  title: string;
  items: StatsItem[];
}

export function StatsCard({ title, items }: StatsCardProps) {
  return (
    <Card title={title}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.player.id}
            className={`flex items-center justify-between border-2 border-[#FFD700]/50 p-3 ${
              item.highlight
                ? "bg-gradient-to-r from-[#8B0000]/30 to-[#4a0000]/30 shadow-[inset_0_0_10px_rgba(255,69,0,0.2)]"
                : "bg-[#1a1a1a]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center text-xs font-black ${
                  index === 0
                    ? "bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                    : index === 1
                      ? "bg-[#C0C0C0] text-black"
                      : index === 2
                        ? "bg-[#CD7F32] text-white"
                        : "bg-[#4a0000] text-[#FFD700]"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-black text-[#FF4500] [text-shadow:0_0_5px_rgba(255,69,0,0.5)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
