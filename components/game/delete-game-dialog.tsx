"use client";
import { GameDetails, Season } from "@/types/types";
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
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";
import { deleteGame } from "@/actions/game";

type DeleteGameDialogProps = {
  game: GameDetails;
};

export default function DeleteGameDialog({
  game,
}: DeleteGameDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    const { error } = await deleteGame(game.id);

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
      title: "Game deleted",
      description: (
        <>
          Game {game.id} was deleted successfully.
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
      <DialogTrigger title="delete game" aria-label="delete game">
        <TrashIcon className="size-5 text-red-600/80" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Game {game.id}
          </DialogTitle>
          <DialogDescription>
            This action will delete the game.
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
