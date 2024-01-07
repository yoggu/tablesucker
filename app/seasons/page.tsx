import PageHeader from "@/components/layout/page-header";
import SeasonForm from "@/components/season/season-form";
import Seasons from "@/components/seasons/seasons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";

export default async function SeasonsPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>Seasons</PageTitle>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Seasons />
        </div>
        <div className="col-span-full">
          <Card>
            <CardHeader>
              <CardTitle>Add Season</CardTitle>
            </CardHeader>
            <CardContent>
              <SeasonForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
