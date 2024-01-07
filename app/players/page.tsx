import PlayerForm from "@/components/player-form";
import { getPlayers } from "@/utils/players";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";
import PlayerAvatar from "@/components/ui/player-avatar";
import Players from "@/components/players/players";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PlayersPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>Players</PageTitle>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Players />
        </div>
        <div className="col-span-full">
          <Card>
            <CardHeader>
              <CardTitle>Add Player</CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
