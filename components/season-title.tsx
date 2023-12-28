import { formatSeasonTitle } from "@/utils/seasons-client";

type SeasonNameProps = {
  date: string;
};

export default function SeasonName({ date }: SeasonNameProps) {
  return <>Season {formatSeasonTitle(date)}</>;
}
