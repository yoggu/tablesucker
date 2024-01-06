import { Season } from "@/types/types";
import { fetchGames } from "@/actions/game";
import WinRateList from "./win-rate-list";
import RealtimeWinRate from "./realtime-win-rate";

type WinRateProps = {
  season: Season;
  realtime?: boolean;
};

export default async function WinRate({ season, realtime }: WinRateProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;

  return (
    <>
      {realtime ? (
        <RealtimeWinRate initialGames={games} season={season} />
      ) : (
        <WinRateList games={games} />
      )}
    </>
  );
}
