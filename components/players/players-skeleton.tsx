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
        <ul className="grid w-fit grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          <li>
            <PlayerAvatarSkeleton showName />
          </li>
          <li>
            <PlayerAvatarSkeleton showName />
          </li>
          <li>
            <PlayerAvatarSkeleton showName />
          </li>
          <li>
            <PlayerAvatarSkeleton showName />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
