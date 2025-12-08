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
            className={`flex items-center justify-between rounded border border-[#333] p-2 ${
              item.highlight ? "bg-[#FFD700]/10 border-[#FFD700]/30" : "bg-[#111]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-sm font-bold ${
                  index === 0
                    ? "text-[#FFD700]"
                    : index === 1
                      ? "text-[#C0C0C0]"
                      : index === 2
                        ? "text-[#CD7F32]"
                        : "text-[#444]"
                }`}
                style={index === 0 ? { textShadow: "0 0 10px rgba(255,215,0,0.5)" } : {}}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className="font-mono text-sm font-bold text-[#FF6B00]"
              style={{ textShadow: "0 0 5px rgba(255,107,0,0.5)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
