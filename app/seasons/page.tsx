import PageHeader from "@/components/layout/page-header";
import SeasonForm from "@/components/season/season-form";
import SeasonsList from "@/components/seasons/seasons-list";
import PageTitle from "@/components/ui/page-title";

export default async function Seasons() {
  return (
    <>
      <PageHeader>
        <PageTitle>Seasons</PageTitle>
      </PageHeader>
      <div className="max-w-xl w-full mx-auto border dark:border-gray-700 rounded-md p-6">
       <SeasonsList />
      </div>
      <div className="mt-5">
        <SeasonForm />
      </div>
    </>
  );
}
