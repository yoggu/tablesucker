import PageHeader from "@/components/layout/page-header";
import DialogSeasonFrom from "@/components/season/dialog-season-form";
import Seasons from "@/components/seasons/seasons";
import PageTitle from "@/components/ui/page-title";

export default async function SeasonsPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>Seasons</PageTitle>
        <DialogSeasonFrom />
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Seasons />
        </div>
      </div>
    </>
  );
}
