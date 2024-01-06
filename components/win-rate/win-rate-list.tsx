import { GameStats } from "@/types/types";
import Link from "next/link";
import { calculatePlayerStats } from "@/utils/games";
import PlayerAvatar from "@/components/ui/player-avatar";
import RankingList from "@/components/ranking/ranking-list";
import RankingListItem from "@/components/ranking/ranking-list-item";

type WinRateListProps = {
  games: GameStats[];
};

export default function WinRateList({ games }: WinRateListProps) {
  const playerStats = calculatePlayerStats(games!);
  const winRates = playerStats.toSorted((a, b) => b.winRate - a.winRate);

  return (
    <RankingList>
      {winRates.map(({ winRate, player }) => (
        <RankingListItem key={player.id}>
          <Link className="col-span-4" href={`/players/${player.id}`}>
            <div className="flex items-center gap-2">
              <PlayerAvatar player={player} />
              <span>{player.name}</span>
            </div>
          </Link>
          <span className="col-span-2 text-center">{winRate}%</span>
        </RankingListItem>
      ))}
    </RankingList>
  );
}
