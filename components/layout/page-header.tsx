import { ModeToggle } from "./mode-toggle";

export default async function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 pb-4 xl:pb-6">
      <div>{children}</div>
      <div className="hidden sm:block">
        <ModeToggle />
      </div>
    </div>
  );
}
