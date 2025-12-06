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
            className={`flex items-center justify-between border-2 p-2 ${
              item.highlight
                ? "border-[#FFD700] bg-[#FFD700]/20"
                : "border-[#DC143C]/30 bg-transparent dark:border-[#FF6B6B]/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-6 text-center text-sm font-black text-[#DC143C] dark:text-[#FF6B6B]">
                {index + 1}.
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-black text-[#8B0000] dark:text-[#FF6B6B]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
