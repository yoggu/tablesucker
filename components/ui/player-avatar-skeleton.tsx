import { Skeleton } from "./skeleton";

export default function PlayerAvatarSkeleton({
  showName = false,
}: {
  showName?: boolean;
}) {
  return (
    <div className="flex gap-3 items-center">
      <Skeleton className="h-10 w-10 rounded-full" />
      {showName && <Skeleton className="h-4 w-12" />}
    </div>
  );
}
