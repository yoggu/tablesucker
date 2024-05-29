"use client";

import { cn } from "@/lib/utils";
import FormatDate from "../ui/format-date";

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
      <FormatDate date={startDate} />
      {endDate && <> - <FormatDate date={endDate} /> </>}
    </div>
  );
}
