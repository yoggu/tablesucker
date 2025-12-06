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
            className={`flex items-center justify-between rounded-lg border-2 p-3 ${
              item.highlight
                ? "border-[#FFD700] bg-[#FFF8E1] dark:border-[#FFB300] dark:bg-[#2D2510]"
                : "border-[#D7CCC8] bg-white dark:border-[#4E342E] dark:bg-[#2D1F1A]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  index === 0
                    ? "bg-gradient-to-br from-[#FFD700] to-[#FFA000] text-[#5D4037] shadow-md"
                    : index === 1
                      ? "bg-gradient-to-br from-[#E0E0E0] to-[#9E9E9E] text-[#424242]"
                      : index === 2
                        ? "bg-gradient-to-br from-[#FFAB91] to-[#CD7F32] text-white"
                        : "bg-[#EFEBE9] text-[#5D4037] dark:bg-[#3E2723] dark:text-[#D7CCC8]"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="font-bold text-[#3E2723] dark:text-[#D7CCC8]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
