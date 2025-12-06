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
                : "border-[#9370DB]/30 bg-transparent dark:border-[#DDA0DD]/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-6 text-center text-sm font-black text-[#9370DB] dark:text-[#DDA0DD]">
                {index + 1}.
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-black text-[#6A5ACD] dark:text-[#DDA0DD]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
