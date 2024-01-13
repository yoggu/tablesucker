import { getCachedGames } from "@/actions/game";
import { SeasonWithState } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import WinRateList from "./win-rate-list";

type WinRateProps = {
  season: SeasonWithState;
};

export default async function WinRate({ season }: WinRateProps) {
  const { data: games, error: gamesError } = await getCachedGames(season.id);
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
