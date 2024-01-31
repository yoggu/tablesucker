"use client";

import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";


export default function FormatDate({ date }: { date: string }) {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    setDateString(formatDate(date));
  }, [date]);

  return <>{dateString}</>;
}
