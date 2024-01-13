import { isCompletedSeason } from "@/lib/utils";
import { Badge } from "../ui/badge";

type SeasonBadgeProps = {
  date: string | null;
};

export default function SeasonBadge({ date }: SeasonBadgeProps) {
  return (
    <>
      {isCompletedSeason(date) ? (
        <Badge variant="destructive">completed</Badge>
      ) : (
        <Badge variant="secondary">active</Badge>
      )}
    </>
  );
}
