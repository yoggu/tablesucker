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
            className={`flex items-center justify-between rounded-md p-2 ${
              item.highlight
                ? "bg-[#DCA561]/10 ring-1 ring-[#DCA561]/30"
                : "bg-[#2A2A37]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-5 text-center text-sm font-medium ${
                index === 0 ? "text-[#DCA561]" :
                index === 1 ? "text-[#C8C093]" :
                index === 2 ? "text-[#957FB8]" : "text-[#727169]"
              }`}>
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-sm font-medium text-[#DCD7BA]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
