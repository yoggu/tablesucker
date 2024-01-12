"use client";
import { Season } from "@/types/types";
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
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { deleteSeason } from "@/actions/season";
import { useToast } from "@/utils/hooks/use-toast";

type DeleteSeasonDialogProps = {
  season: Season;
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
          <SeasonTitle date={season!.start_date} /> was deleted successfully.
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
      <DialogTrigger>
        <TrashIcon className="size-5 text-red-800 " />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <SeasonTitle date={season.start_date} />
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
