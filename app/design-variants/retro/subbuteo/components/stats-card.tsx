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
                ? "border-[#FFD700] bg-gradient-to-r from-[#FFD700]/20 to-transparent"
                : "border-[#8B4513]/20 bg-white/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 text-center font-bold ${
                  index === 0
                    ? "text-[#FFD700]"
                    : index === 1
                      ? "text-[#C0C0C0]"
                      : index === 2
                        ? "text-[#CD7F32]"
                        : "text-[#8B4513]/50"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="font-bold text-[#2D5016]">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
