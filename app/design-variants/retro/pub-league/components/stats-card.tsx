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
            className={`flex items-center justify-between rounded-lg border p-3 ${
              item.highlight
                ? "border-[#FDD835] bg-[#FDD835]/10"
                : "border-[#2E7D32] bg-[#0D3B0F]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 text-center font-bold ${
                  index === 0
                    ? "text-[#FDD835]"
                    : index === 1
                      ? "text-[#BDBDBD]"
                      : index === 2
                        ? "text-[#A1887F]"
                        : "text-[#4CAF50]"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="font-bold text-[#FDD835]">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
