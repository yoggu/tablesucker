import { HTMLAttributes } from "react";

export default function RankingList({ children }: HTMLAttributes<HTMLUListElement>) {

  return (
    <ul className="flex flex-col gap-3">
      {children}
    </ul>
  );
}
