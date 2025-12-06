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
    <Card>
      <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center justify-between rounded-xl p-3 backdrop-blur-sm transition-all ${
              item.highlight
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-sky-500/20 dark:to-purple-500/20"
                : "hover:bg-white/40 dark:hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold backdrop-blur-sm ${
                  index === 0
                    ? "bg-gradient-to-br from-amber-400/80 to-yellow-500/80 text-amber-900"
                    : index === 1
                      ? "bg-gradient-to-br from-slate-300/80 to-slate-400/80 text-slate-700"
                      : index === 2
                        ? "bg-gradient-to-br from-amber-600/80 to-orange-600/80 text-white"
                        : "bg-white/50 text-slate-600 dark:bg-white/20 dark:text-slate-300"
                }`}
              >
                {index + 1}
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {item.name}
              </span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-sky-400">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
