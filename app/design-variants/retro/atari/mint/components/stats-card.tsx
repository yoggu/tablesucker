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
                : "border-[#20B2AA]/30 bg-transparent dark:border-[#40E0D0]/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-6 text-center text-sm font-black text-[#20B2AA] dark:text-[#40E0D0]">
                {index + 1}.
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-black text-[#008B8B] dark:text-[#40E0D0]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
