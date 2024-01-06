import { Season } from "@/types/types";
import { fetchGames } from "@/actions/game";
import WinRateList from "./win-rate-list";
import RealtimeWinRate from "./realtime-win-rate";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type WinRateProps = {
  season: Season;
  realtime?: boolean;
};

export default async function WinRate({ season, realtime }: WinRateProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win Rate</CardTitle>
      </CardHeader>
      <CardContent>
        {realtime ? (
          <RealtimeWinRate initialGames={games} season={season} />
        ) : (
          <WinRateList games={games} />
        )}
      </CardContent>
    </Card>
  );
}
