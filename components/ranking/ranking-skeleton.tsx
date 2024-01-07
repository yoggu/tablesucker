import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PlayerAvatarSkeleton from "../ui/player-avatar-skeleton";
import { Skeleton } from "../ui/skeleton";
import RankingList from "./ranking-list";
import RankingListItem from "./ranking-list-item";

export default async function RankingSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <RankingList>
          <RankingListItemSkeleton />
          <RankingListItemSkeleton />
          <RankingListItemSkeleton />
          <RankingListItemSkeleton />
          <RankingListItemSkeleton />
        </RankingList>
      </CardContent>
    </Card>
  );
}

function RankingListItemSkeleton() {
  return (
    <RankingListItem>
      <div className="col-span-4">
        <PlayerAvatarSkeleton />
      </div>
      <div className="col-span-2 flex justify-center">
        <Skeleton className="h-5 w-12" />
      </div>
    </RankingListItem>
  );
}
