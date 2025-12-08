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
            className={`flex items-center justify-between rounded-none border-2 border-[#000] p-2 ${
              item.highlight ? "bg-[#FFD700]" : "bg-[#3A6F19]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-5 font-mono text-sm font-bold ${
                  item.highlight ? "text-[#000]" : "text-white"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className={`font-mono font-bold ${
                item.highlight ? "text-[#000]" : "text-[#FFFF00]"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
