"use client";
import { deleteSeason } from "@/actions/season";
import { useToast } from "@/lib/hooks/use-toast";
import { SeasonWithState } from "@/types/types";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SeasonTitle from "./season-title";

type DeleteSeasonDialogProps = {
  season: SeasonWithState;
};

export default function DeleteSeasonDialog({
  season,
}: DeleteSeasonDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    const { error } = await deleteSeason(season.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
          (error as Error).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Season deleted",
      description: (
        <>
          <SeasonTitle startDate={season!.start_date} /> was deleted successfully.
        </>
      ),
    });
    setDialogOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger title="delete season" aria-label="delete season">
        <TrashIcon className="size-5 text-red-600/80" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <SeasonTitle startDate={season.start_date} />
          </DialogTitle>
          <DialogDescription>
            This action will delete all data associated with this season.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
