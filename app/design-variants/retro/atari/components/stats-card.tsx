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
            className={`flex items-center justify-between border-4 border-[#FF6600] p-2 dark:border-[#FFCC00] ${
              item.highlight
                ? "bg-[#FF6600]/20 dark:bg-[#FFCC00]/10"
                : "bg-black"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center text-xs font-black ${
                  index === 0
                    ? "bg-[#FFD700] text-black"
                    : index === 1
                      ? "bg-[#C0C0C0] text-black"
                      : index === 2
                        ? "bg-[#CD7F32] text-white"
                        : "bg-[#FF6600] text-white dark:bg-[#FFCC00] dark:text-black"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-black text-[#FF6600] dark:text-[#FFCC00]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
