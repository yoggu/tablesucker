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
            className={`flex items-center justify-between rounded border-2 p-3 ${
              item.highlight
                ? "border-[#FFD700] bg-[#FFD700]/10"
                : "border-[#1E3A5F] bg-[#0D1F33]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 text-center font-black ${
                  index === 0
                    ? "text-[#FFD700]"
                    : index === 1
                      ? "text-[#C0C0C0]"
                      : index === 2
                        ? "text-[#CD7F32]"
                        : "text-[#1E3A5F]"
                }`}
                style={index === 0 ? { textShadow: "0 0 10px rgba(255,215,0,0.5)" } : {}}
              >
                #{index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className="font-black text-[#FFD700]"
              style={{ textShadow: "0 0 5px rgba(255,215,0,0.5)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
