"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddButton from "../ui/add-button";
import PlayerForm from "./player-form";

export default function DialogGameForm() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <AddButton title="Add Player" />
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-full">
        <DialogHeader>
          <DialogTitle>Add Player</DialogTitle>
        </DialogHeader>
        <PlayerForm onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
