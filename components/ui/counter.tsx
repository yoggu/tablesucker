"use client";
import CountUp, { CountUpProps } from "react-countup";

export default function Counter({ ...props }: CountUpProps) {
  return <CountUp {...props} />;
}
