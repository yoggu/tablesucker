import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function Seasons() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seasons</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-6">
          <SeasonListItemSkeleton />
          <SeasonListItemSkeleton />
          <SeasonListItemSkeleton />
        </ul>
      </CardContent>
    </Card>
  );
}

function SeasonListItemSkeleton() {
  return (
    <li className="border-b pb-4 last-of-type:border-0 last-of-type:pb-0 dark:border-gray-700">
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-14 mt-2" />
    </li>
  );
}
