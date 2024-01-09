"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import players from "../players/players";
import seasons from "../seasons/seasons";
import GameForm from "./game-form";
import { Button } from "../ui/button";
import { Player, Season } from "@/types/types";
import AddButton from "../ui/add-button";

type DialogGameFormProps = {
  seasons: Season[];
  players: Player[];
};

export default function DialogGameForm({ seasons, players }: DialogGameFormProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <AddButton title="Add Game" />
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>
        <GameForm seasons={seasons} players={players} onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
