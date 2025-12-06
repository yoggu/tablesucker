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
            className={`flex items-center justify-between border-2 border-[#0F380F] p-2 dark:border-[#1a1a2e] ${
              item.highlight ? "bg-[#306230]/40 dark:bg-[#4a4a6a]/40" : "bg-[#9BBC0F] dark:bg-[#0a0a14]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center text-[8px] font-bold ${
                  index === 0
                    ? "bg-[#0F380F] text-[#9BBC0F] dark:bg-[#8888c8] dark:text-[#0a0a14]"
                    : index === 1
                      ? "bg-[#306230] text-[#9BBC0F] dark:bg-[#6868a8] dark:text-[#0a0a14]"
                      : index === 2
                        ? "bg-[#8BAC0F] text-[#0F380F] border border-[#0F380F] dark:bg-[#4a4a6a] dark:text-[#c8c8d8] dark:border-[#1a1a2e]"
                        : "bg-[#8BAC0F] text-[#306230] border border-[#306230] dark:bg-[#2d2d44] dark:text-[#6868a8] dark:border-[#4a4a6a]"
                }`}
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className="text-[10px] font-bold text-[#0F380F] dark:text-[#9898b8]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
