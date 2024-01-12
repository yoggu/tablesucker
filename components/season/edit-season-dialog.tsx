"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SeasonForm from "./season-form";
import { Season } from "@/types/types";
import { EditIcon } from "lucide-react";

export default function EditSeasonDialog({ season }: { season: Season }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <EditIcon className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Season</DialogTitle>
        </DialogHeader>
        <SeasonForm season={season} onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
