import { SeasonState, SeasonStateEnum } from "@/types/types";
import { Badge } from "../ui/badge";

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
