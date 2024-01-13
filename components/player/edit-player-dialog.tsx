"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Player } from "@/types/types";
import { EditIcon } from "lucide-react";
import PlayerForm from "./player-form";

export default function EditPlayerDialog({ player }: { player: Player }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger title="edit player" aria-label="edit player">
        <EditIcon className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
        </DialogHeader>
        <PlayerForm player={player} onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
