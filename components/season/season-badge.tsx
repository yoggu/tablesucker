import { isCompletedSeason, isUpcomingSeason } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { SeasonState, SeasonStateEnum } from "@/types/types";

type SeasonBadgeProps = {
  state: SeasonState;
};

export default function SeasonBadge({ state }: SeasonBadgeProps) {
  return (
    <>
      {state === SeasonStateEnum.Completed ? (
        <Badge variant="outline">completed</Badge>
      ) : state === SeasonStateEnum.Upcoming ? (
        <Badge variant="secondary">upcoming</Badge>
      ) : (
        <Badge>active</Badge>
      )}
    </>
  );
}
