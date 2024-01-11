import PageHeader from "@/components/layout/page-header";
import DialogSeasonFrom from "@/components/season/dialog-season-form";
import Seasons from "@/components/seasons/seasons";
import SeasonsSkeleton from "@/components/seasons/seasons-skeleton";
import PageTitle from "@/components/ui/page-title";
import { Suspense } from "react";

export default async function SeasonsPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>Seasons</PageTitle>
        <DialogSeasonFrom />
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Suspense fallback={<SeasonsSkeleton />}>
            <Seasons />
          </Suspense>
        </div>
      </div>
    </>
  );
}
