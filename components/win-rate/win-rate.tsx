import { Season } from "@/types/types";
import { fetchGames } from "@/actions/game";
import WinRateList from "./win-rate-list";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type WinRateProps = {
  season: Season;
};

export default async function WinRate({ season }: WinRateProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <WinRateList games={games} />
      </CardContent>
    </Card>
  );
}
