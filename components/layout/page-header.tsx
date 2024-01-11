
export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 pb-4 sm:pb-6 xl:pb-8">
      {children}
    </div>
  );
}
