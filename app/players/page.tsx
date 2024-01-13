
import PageHeader from "@/components/layout/page-header";
import DialogPlayerForm from "@/components/player/dialog-player-form";
import Players from "@/components/players/players";
import PlayersSkeleton from "@/components/players/players-skeleton";
import PageTitle from "@/components/ui/page-title";
import { Suspense } from "react";

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
