import { getCachedGames } from "@/actions/game";
import { SeasonWithState } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TopscorerList from "./topscorer-list";

type TopscorerProps = {
  season: SeasonWithState;
};

export default async function Topscorer({ season }: TopscorerProps) {
  const { data: games, error: gamesError } = await getCachedGames(season.id);
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
