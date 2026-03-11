"use client";

import { Player, SeasonWithState } from "@/types/types";
import { useState } from "react";
import AddButton from "../ui/add-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GameForm, { type DefaultTeams } from "./game-form";

type DialogGameFormProps = {
  seasons: SeasonWithState[];
  players: Player[];
  defaultTeams?: DefaultTeams;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
};

export default function DialogGameForm({
  seasons,
  players,
  defaultTeams,
  open,
  onOpenChange,
  showTrigger = true,
}: DialogGameFormProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : dialogOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setDialogOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const closeDialog = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={resolvedOpen} onOpenChange={handleOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <AddButton title="Add Game" />
        </DialogTrigger>
      )}
      <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>
        <GameForm
          seasons={seasons}
          players={players}
          onClose={closeDialog}
          defaultTeams={defaultTeams}
        />
      </DialogContent>
    </Dialog>
  );
}
