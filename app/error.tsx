"use client";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <>
      <PageHeader>
        <PageTitle>Oops...</PageTitle>
      </PageHeader>
      <div className="mt-8 text-center text-lg">
        <p>Something went wrong. Please try again later.</p>
        <Button className="mt-8" onClick={reset}>Try again</Button>
      </div>
    </>
  );
}
