"use client";

import { cn, formatDate } from "@/lib/utils";

type SeasonDateRangeProps = {
  startDate: string;
  endDate: string | null;
  className?: string;
};

export default function SeasonDateRange({
  startDate,
  endDate,
  className
}: SeasonDateRangeProps) {
  return (
    <div className={cn("text-xs", className)}>
      {formatDate(startDate)}
      {endDate && ` - ${formatDate(endDate)}`}
    </div>
  );
}
