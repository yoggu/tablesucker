import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import PlayerAvatarSkeleton from "../ui/player-avatar-skeleton";
import { Skeleton } from "../ui/skeleton";

export default function GamesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Games</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-6">
          <GameListItemSkeleton />
          <GameListItemSkeleton />
          <GameListItemSkeleton />
          <GameListItemSkeleton />
          <GameListItemSkeleton />
        </ul>
      </CardContent>
    </Card>
  );
}

function GameListItemSkeleton() {
  return (
    <li className="grid grid-cols-[minmax(80px,1fr)_minmax(0,100px)_minmax(80px,1fr)] gap-2 border-b pb-4 last:border-0 last:pb-0 sm:gap-4 md:gap-8 xl:gap-12 dark:border-slate-700">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end ">
          <span className="relative">Team Red</span>
        </div>
        <ul className="flex flex-wrap justify-end gap-3">
          <li>
            <PlayerAvatarSkeleton />
          </li>
          <li>
            <PlayerAvatarSkeleton />
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-end">
        <span className="text-4xl lg:text-5xl flex gap-1">
          <Skeleton className="h-16 w-10" />:<Skeleton className="h-16 w-10" />
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex">
          <span className="relative">Team Blue</span>
        </div>
        <ul className="flex flex-wrap gap-3">
          <li>
            <PlayerAvatarSkeleton />
          </li>
          <li>
            <PlayerAvatarSkeleton />
          </li>
        </ul>
      </div>
    </li>
  );
}
