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
import SeasonForm from "./season-form";

export default function DialogSeasonFrom() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <AddButton title="Add Season" />
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Season</DialogTitle>
        </DialogHeader>
        <SeasonForm onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
