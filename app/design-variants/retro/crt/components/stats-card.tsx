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
            className={`flex items-center justify-between border-2 border-[#006400] p-2 font-mono dark:border-[#39FF14] ${
              item.highlight
                ? "bg-[#006400]/10 dark:bg-[#39FF14]/10"
                : "bg-white dark:bg-[#0a0a0a]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center font-mono text-xs font-bold ${
                  index === 0
                    ? "bg-yellow-400 text-black"
                    : index === 1
                      ? "bg-gray-300 text-black"
                      : index === 2
                        ? "bg-amber-600 text-white"
                        : "bg-[#006400]/20 text-[#006400] dark:bg-[#39FF14]/20 dark:text-[#39FF14]"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-bold text-[#006400] dark:text-[#39FF14] dark:[text-shadow:0_0_5px_#39FF14]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
