import { HTMLAttributes } from "react";

export default function RankingList({ children }: HTMLAttributes<HTMLUListElement>) {

  return (
    <ul className="flex mt-2 flex-col gap-4">
      {children}
    </ul>
  );
}
