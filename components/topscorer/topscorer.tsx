import { Season } from "@/types/types";
import { fetchGames } from "@/actions/game";
import TopscorerList from "./topscorer-list";
import RealtimeTopscorer from "./realtime-topscorer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type TopscorerProps = {
  season: Season;
  realtime?: boolean;
};

export default async function Topscorer({ season, realtime }: TopscorerProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topscorer</CardTitle>
      </CardHeader>
      <CardContent>
        {realtime ? (
          <RealtimeTopscorer initialGames={games} season={season} />
        ) : (
          <TopscorerList games={games} />
        )}
      </CardContent>
    </Card>
  );
}
