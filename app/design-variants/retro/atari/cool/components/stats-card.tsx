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
            className={`flex items-center justify-between border-2 border-[#00DDFF]/50 p-3 ${
              item.highlight
                ? "bg-[#0088FF]/20"
                : "bg-[#0a1628]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center text-sm font-black ${
                  index === 0
                    ? "bg-[#FFD700] text-black"
                    : index === 1
                      ? "bg-[#C0C0C0] text-black"
                      : index === 2
                        ? "bg-[#CD7F32] text-white"
                        : "bg-[#0088FF] text-white"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="text-base font-black text-[#00DDFF]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
