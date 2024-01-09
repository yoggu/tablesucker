"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GameForm from "./game-form";
import { Player, Season } from "@/types/types";
import AddButton from "../ui/add-button";

type DialogGameFormProps = {
  seasons: Season[];
  players: Player[];
};

export default function DialogGameForm({
  seasons,
  players,
}: DialogGameFormProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <AddButton title="Add Game" />
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>
        <GameForm seasons={seasons} players={players} onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
