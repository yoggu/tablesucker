import { Card } from "./card";

interface StatsItem {
  name: string;
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
            key={item.name}
            className={`flex items-center justify-between border-2 border-[#FF6B35] p-2 font-mono dark:border-[#39FF14] ${
              item.highlight
                ? "bg-[#FF6B35]/20 dark:bg-[#39FF14]/10"
                : "bg-white dark:bg-[#0D1117]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center text-xs font-bold ${
                  index === 0
                    ? "bg-[#FFD700] text-black"
                    : index === 1
                      ? "bg-[#C0C0C0] text-black"
                      : index === 2
                        ? "bg-[#CD7F32] text-white"
                        : "bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {index + 1}
              </span>
              <span className="text-sm text-slate-700 dark:text-[#39FF14]/80">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-bold text-[#FF6B35] dark:text-[#39FF14] dark:[text-shadow:0_0_5px_#39FF14]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
