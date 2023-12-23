"use client"

type SeasonDateRangeProps = {
  startDate: string;
  endDate: string | null;
};

export default function SeasonDateRange({ startDate, endDate }: SeasonDateRangeProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    console.log(date)
    return date.toLocaleDateString(navigator?.language ?? 'de-CH', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  }

  return (
    <span className="text-xs mt-1">{formatDate(startDate)}{endDate && ` - ${formatDate(endDate)}`}</span>
  );
}
