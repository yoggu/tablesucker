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

const trophyIcons = ["🥇", "🥈", "🥉", ""];

export function StatsCard({ title, items }: StatsCardProps) {
  return (
    <Card title={title}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.player.id}
            className={`flex items-center justify-between rounded-lg border-2 p-3 ${
              item.highlight
                ? "border-[#FFD700]/50 bg-gradient-to-r from-[#FFD700]/10 to-transparent"
                : "border-[#8B4513]/30 bg-[#1A0F0A]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{trophyIcons[index] || ""}</span>
              <span
                className={`w-6 text-center font-bold ${
                  index === 0
                    ? "text-[#FFD700]"
                    : index === 1
                      ? "text-[#C0C0C0]"
                      : index === 2
                        ? "text-[#CD7F32]"
                        : "text-[#8B4513]"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className="font-bold text-[#FFD700]"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
