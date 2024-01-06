import { HTMLAttributes } from "react";

export default function RankingListItem({
  children,
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li className="grid grid-cols-6 items-center gap-4 border-b pb-4 last:border-0 last:pb-0 dark:border-gray-700">
      {children}
    </li>
  );
}
