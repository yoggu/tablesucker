"use client";
import { Player, Season } from "@/types/types";
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
import { ArchiveIcon } from "lucide-react";
import { deleteSeason } from "@/actions/season";
import { useToast } from "@/lib/hooks/use-toast";
import { archivePlayer } from "@/actions/player";

type ArchivePlayerDialogProps = {
  player: Player;
};

export default function ArchivePlayerDialog({
  player,
}: ArchivePlayerDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const onArchive = async () => {
    const { error } = await archivePlayer(player.id);

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
      title: "Player archived",
      description: <>{player.name} was archived successfully.</>,
    });
    setDialogOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger title="archive player" aria-label="archive player">
        <ArchiveIcon className="size-5 text-yellow-600/80" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive Player {player.name}</DialogTitle>
          <DialogDescription>
            This action will archive the player.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button  onClick={onArchive}>
            Archive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
