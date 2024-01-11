import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";

export default async function NotFound() {
  return (
    <>
      <PageHeader>
        <PageTitle>404 Not Found</PageTitle>
      </PageHeader>
      <div>
        <p className="text-center text-lg mt-8">
          The page you are looking for does not exist.
        </p>
      </div>
    </>
  );
}
