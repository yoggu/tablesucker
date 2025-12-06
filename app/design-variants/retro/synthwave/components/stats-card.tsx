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
            className={`flex items-center justify-between rounded-lg border border-[#FF00FF]/30 p-3 transition-all dark:border-[#FF00FF]/50 ${
              item.highlight
                ? "bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20 dark:shadow-[inset_0_0_15px_rgba(255,0,255,0.2)]"
                : "hover:bg-[#FF00FF]/5 dark:hover:bg-[#FF00FF]/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                  index === 0
                    ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black"
                    : index === 1
                      ? "bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0] text-black"
                      : index === 2
                        ? "bg-gradient-to-br from-[#CD7F32] to-[#8B4513] text-white"
                        : "bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] text-white"
                }`}
              >
                {index + 1}
              </span>
              <PlayerAvatar player={item.player} showName size="sm" />
            </div>
            <span
              className="text-sm font-bold"
              style={{
                background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
