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
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center justify-between rounded-2xl p-3 transition-colors ${
              item.highlight
                ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40"
                : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                    : index === 1
                      ? "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900"
                      : index === 2
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {index + 1}
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {item.name}
              </span>
            </div>
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
