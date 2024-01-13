"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { Input } from "../ui/input";
import { useState } from "react";
import { createPlayer } from "@/actions/player";
import { useToast } from "@/lib/hooks/use-toast";
import { Player } from "@/types/types";

type PlayerFormSmallProps = {
  updatePlayers: (player: Player) => void;
};

export default function PlayerFormSmall({
  updatePlayers,
}: PlayerFormSmallProps) {
  const { toast } = useToast();
  const [name, setName] = useState<string>("");

  const addPlayer = async () => {
    const { data, error } = await createPlayer({ name });
    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
          (error as Error).message || "An unexpected error occurred.",
      });
      return;
    }
    updatePlayers(data!);
    setName("");
  };
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className="rounded-full px-2 dark:border-gray-400"
        >
          <Plus className="dark:text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <PopoverArrow className="dark:fill-slate-800" />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="playerName"
          type="text"
          placeholder="Name"
        />
        <div className="pt-2">
          <PopoverClose asChild>
            <Button type="button" onClick={addPlayer}>
              Add
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
