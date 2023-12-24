"use client";

import { formatDate } from "@/utils/utils";

type SeasonDateRangeProps = {
  startDate: string;
  endDate: string | null;
};

export default function SeasonDateRange({
  startDate,
  endDate,
}: SeasonDateRangeProps) {
  return (
    <div className="mt-1 text-xs">
      {formatDate(startDate)}
      {endDate && ` - ${formatDate(endDate)}`}
    </div>
  );
}
