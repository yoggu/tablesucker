"use client";
import { GameDetails, Player, SeasonWithState } from "@/types/types";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GameForm from "./game-form";

type EditGameDialogProps = {
  game: GameDetails;
  players: Player[];
  seasons: SeasonWithState[];
};

export default function EditGameDialog({
  game,
  players,
  seasons,
}: EditGameDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger title="edit game" aria-label="edit game">
        <EditIcon className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Game {game.id}</DialogTitle>
        </DialogHeader>
        <GameForm
          seasons={seasons}
          players={players}
          game={game}
          onClose={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
