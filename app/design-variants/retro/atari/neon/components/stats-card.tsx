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
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.player.id}
            className={`flex items-center justify-between border-2 border-[#00FF88]/50 p-3 ${
              item.highlight
                ? "bg-gradient-to-r from-[#AA00FF]/20 to-[#00FF88]/20"
                : "bg-[#0a0a14]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center text-sm font-black ${
                  index === 0
                    ? "bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                    : index === 1
                      ? "bg-[#C0C0C0] text-black"
                      : index === 2
                        ? "bg-[#CD7F32] text-white"
                        : "bg-[#AA00FF] text-white"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-base font-black text-[#00FF88] [text-shadow:0_0_5px_rgba(0,255,136,0.5)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
