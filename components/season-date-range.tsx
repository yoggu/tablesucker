"use client";

type SeasonDateRangeProps = {
  startDate: string;
  endDate: string | null;
};

export default function SeasonDateRange({
  startDate,
  endDate,
}: SeasonDateRangeProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = typeof navigator !== 'undefined' ? navigator.language : "de-CH";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mt-1 text-xs">
      {formatDate(startDate)}
      {endDate && ` - ${formatDate(endDate)}`}
    </div>
  );
}
