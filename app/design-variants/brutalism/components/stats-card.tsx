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
      <h2 className="mb-4 text-2xl font-black uppercase text-black dark:text-white">
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center justify-between border-2 border-black p-3 dark:border-white ${
              item.highlight
                ? "bg-[#FFFF00]"
                : "bg-white dark:bg-[#1a1a1a]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center text-sm font-black ${
                  index === 0
                    ? "bg-[#FFFF00] text-black"
                    : index === 1
                      ? "bg-[#C0C0C0] text-black"
                      : index === 2
                        ? "bg-[#CD7F32] text-white"
                        : "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`font-black uppercase ${item.highlight ? "text-black" : "text-black dark:text-white"}`}
              >
                {item.name}
              </span>
            </div>
            <span
              className={`font-black ${item.highlight ? "text-black" : "text-[#0066FF] dark:text-[#00FFFF]"}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
