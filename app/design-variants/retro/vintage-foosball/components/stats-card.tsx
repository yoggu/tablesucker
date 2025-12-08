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
            className={`flex items-center justify-between rounded border p-3 ${
              item.highlight
                ? "border-[#B8860B] bg-[#B8860B]/10"
                : "border-[#8B7355]/40 bg-[#3D2914]/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 text-center font-serif font-bold ${
                  index === 0
                    ? "text-[#FFD700]"
                    : index === 1
                      ? "text-[#C0C0C0]"
                      : index === 2
                        ? "text-[#CD7F32]"
                        : "text-[#8B7355]"
                }`}
                style={index < 3 ? { textShadow: "1px 1px 2px rgba(0,0,0,0.5)" } : {}}
              >
                {index + 1}.
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className="font-serif font-bold text-[#DEB887]"
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
