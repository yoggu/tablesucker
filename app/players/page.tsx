import PlayerForm from "@/components/player/player-form";
import { getPlayers } from "@/utils/players";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";
import Players from "@/components/players/players";
import DialogPlayerForm from "@/components/player/dialog-player-form";
import { Suspense } from "react";
import PlayersSkeleton from "@/components/players/players-skeleton";

export default async function PlayersPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>Players</PageTitle>
        <DialogPlayerForm />
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Suspense fallback={<PlayersSkeleton />}>
            <Players />
          </Suspense>
        </div>
      </div>
    </>
  );
}
