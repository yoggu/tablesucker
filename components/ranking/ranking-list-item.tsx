import { HTMLAttributes } from "react";

export default function RankingListItem({
  children,
}:  & HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className="grid grid-cols-6 items-center gap-4 border-b dark:border-gray-700 last:border-0 px-4 py-4"
    >
      {children}
    </li>
  );
}
