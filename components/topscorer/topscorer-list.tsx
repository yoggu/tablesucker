import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameStats, Season } from "@/types/types";
import Link from "next/link";
import { calculatePlayerStats } from "@/utils/games";
import RankingList from "@/components/ranking/ranking-list";
import RankingListItem from "@/components/ranking/ranking-list-item";
import PlayerAvatar from "@/components/ui/player-avatar";

type TopscorerListProps = {
  games: GameStats[];
};

export default function TopscorerList({ games }: TopscorerListProps) {
  const playerStats = calculatePlayerStats(games!);
  const topScorers = playerStats.toSorted((a, b) => b.goalsFor - a.goalsFor);

  return (
    <RankingList>
      {topScorers.map(({ goalsFor, player }, index) => (
        <RankingListItem key={player.id}>
          <div className="col-span-4">
            <PlayerAvatar player={player} showName showCrown={index === 0} link />
          </div>
          <span className="col-span-2 text-center">{goalsFor}</span>
        </RankingListItem>
      ))}
    </RankingList>
  );
}
