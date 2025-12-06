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
            className={`flex items-center justify-between rounded-sm border-2 border-[#5D3A1A]/30 p-3 dark:border-[#D4A574]/20 ${
              item.highlight
                ? "bg-[#DAA520]/20 dark:bg-gradient-to-r dark:from-[#8B2500]/20 dark:to-[#1A5631]/20"
                : "bg-[#FDF8F0] dark:bg-[#0D0804]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-serif text-sm font-bold ${
                  index === 0
                    ? "border-[#8B6914] bg-[#DAA520] text-[#5D3A1A] dark:bg-gradient-to-br dark:from-[#DAA520] dark:to-[#8B4513] dark:text-[#1A1008] dark:shadow-[0_0_10px_rgba(218,165,32,0.4)]"
                    : index === 1
                      ? "border-[#5D5D5D] bg-[#C0C0C0] text-[#3D3D3D]"
                      : index === 2
                        ? "border-[#5D3A1A] bg-[#CD7F32] text-[#FDF8F0]"
                        : "border-[#5D3A1A] bg-[#E8D5C4] text-[#5D3A1A] dark:bg-[#3D2817] dark:text-[#D4A574]"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span className="font-serif text-base font-bold text-[#5D3A1A] dark:text-[#D4A574]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
