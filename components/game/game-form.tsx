"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GameFormSchema } from "@/lib/schema";
import { createGame } from "@/actions/game";
import { GameDetails, Player, Season } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SeasonTitle from "../season/season-title";
import { AvatarCheckbox } from "../ui/avatar-checkbox";
import { useState } from "react";
import PlayerFormSmall from "../player/player-form-small";
import { NumberInput } from "../ui/number-input";

type Inputs = z.infer<typeof GameFormSchema>;
type GameFormProps = {
  players: Player[];
  seasons: Season[];
  onClose?: () => void;
  game?: GameDetails;
};

export default function GameForm({ players, seasons, onClose, game }: GameFormProps) {
  const { toast } = useToast();
  const [teamRedPlayers, setTeamRedPlayers] = useState<Player[]>(players);
  const [teamBluePlayers, setTeamBluePlayers] = useState<Player[]>(players);
  const form = useForm<Inputs>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: {
      team_red: {
        players: [],
        score: "",
      },
      team_blue: {
        players: [],
        score: "",
      },
      season_id:
        seasons && seasons.length > 0 ? seasons[0]?.id?.toString() : "",
    },
  });

  async function onSubmit(data: Inputs) {
    const { data: createdGame, error } = await createGame(data);
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
      title: "Game created successfully",
      description: `Game with ID ${createdGame?.game_id} was created.`,
    });
    form.reset();
    if (onClose) {
      onClose();
    }
  }

  const updateTeamRedPlayers = (player: Player) => {
    setTeamRedPlayers([...teamRedPlayers, player]);
    form.setValue("team_red.players", [
      ...form.getValues("team_red.players"),
      player.id,
    ]);
  };

  const updateTeamBluePlayers = (player: Player) => {
    setTeamBluePlayers([...teamBluePlayers, player]);
    form.setValue("team_blue.players", [
      ...form.getValues("team_blue.players"),
      player.id,
    ]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="@container">
        <FormField
          control={form.control}
          name="season_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field?.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an active season" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.id} value={season?.id?.toString()}>
                      <SeasonTitle date={season.start_date} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8 flex flex-col gap-8 @lg:flex-row @xl:gap-10">
          <div className="flex flex-col gap-4">
            <FormLabel>Team Red</FormLabel>
            <FormField
              control={form.control}
              name="team_red.players"
              render={() => (
                <FormItem>
                  <div className="flex flex-wrap gap-3">
                    {players.map((player) => (
                      <FormField
                        key={player.id}
                        control={form.control}
                        name="team_red.players"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={player.id}
                              className="flex justify-center space-y-0"
                            >
                              <FormControl>
                                <AvatarCheckbox
                                  checked={field.value?.includes(player.id)}
                                  disabled={
                                    !teamRedPlayers.some(
                                      (p) => p.id === player.id,
                                    )
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...field?.value,
                                        player.id,
                                      ]);
                                      setTeamBluePlayers(
                                        teamBluePlayers.filter(
                                          (p) => p.id !== player.id,
                                        ),
                                      );
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value) => value !== player.id,
                                        ),
                                      );
                                      setTeamBluePlayers([
                                        ...teamBluePlayers,
                                        player,
                                      ]);
                                    }
                                  }}
                                  player={player}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <PlayerFormSmall updatePlayers={updateTeamRedPlayers} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team_red.score"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <NumberInput placeholder="score" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="hidden items-center justify-center text-5xl @lg:flex">
            :
          </div>
          <div className="flex flex-col gap-4">
            <FormLabel>Team Blue</FormLabel>
            <FormField
              control={form.control}
              name="team_blue.players"
              render={() => (
                <FormItem>
                  <div className="flex flex-wrap gap-3">
                    {players.map((player) => (
                      <FormField
                        key={player.id}
                        control={form.control}
                        name="team_blue.players"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={player.id}
                              className="flex items-center"
                            >
                              <FormControl>
                                <AvatarCheckbox
                                  checked={field.value?.includes(player.id)}
                                  disabled={
                                    !teamBluePlayers.some(
                                      (p) => p.id === player.id,
                                    )
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...field?.value,
                                        player.id,
                                      ]);
                                      setTeamRedPlayers(
                                        teamRedPlayers.filter(
                                          (p) => p.id !== player.id,
                                        ),
                                      );
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value) => value !== player.id,
                                        ),
                                      );
                                      setTeamRedPlayers([
                                        ...teamRedPlayers,
                                        player,
                                      ]);
                                    }
                                  }}
                                  player={player}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <PlayerFormSmall updatePlayers={updateTeamBluePlayers} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team_blue.score"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <NumberInput placeholder="score" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="mt-8" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
