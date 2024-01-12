import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlayerAvatar from "../ui/player-avatar";
import PlayerAvatarSkeleton from "../ui/player-avatar-skeleton";

export default function PlayersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-y-6 gap-x-8 lg:grid-cols-2">
          <PlayersSkeletonItem />
          <PlayersSkeletonItem />
          <PlayersSkeletonItem />
          <PlayersSkeletonItem />
          <PlayersSkeletonItem />
          <PlayersSkeletonItem />
        </ul>
      </CardContent>
    </Card>
  );
}

function PlayersSkeletonItem() {
  return (
    <li className="flex animate-fade-in justify-between border-b pb-4 lg:col-span-1 dark:border-gray-700 last:border-b-0 last:pb-0 lg:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+2)]:pb-0">
      <PlayerAvatarSkeleton showName />
    </li>
  );
}
