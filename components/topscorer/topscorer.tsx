import { Season } from "@/types/types";
import { fetchGames } from "@/actions/game";
import TopscorerList from "./topscorer-list";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type TopscorerProps = {
  season: Season;
};

export default async function Topscorer({ season }: TopscorerProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topscorer</CardTitle>
      </CardHeader>
      <CardContent>
        <TopscorerList games={games} />
      </CardContent>
    </Card>
  );
}
