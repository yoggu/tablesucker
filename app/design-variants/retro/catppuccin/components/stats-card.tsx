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
            className={`flex items-center justify-between rounded-lg p-2 ${
              item.highlight
                ? "bg-[#F9E2AF]/10 ring-1 ring-[#F9E2AF]/30"
                : "bg-[#313244]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-5 text-center text-sm font-medium ${
                index === 0 ? "text-[#F9E2AF]" :   // Gold
                index === 1 ? "text-[#BAC2DE]" :   // Silver
                index === 2 ? "text-[#FAB387]" :   // Bronze (Peach)
                "text-[#6C7086]"
              }`}>
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-medium text-[#CDD6F4]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
