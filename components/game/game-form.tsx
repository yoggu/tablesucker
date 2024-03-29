"use client";

import { createGame, updateGame } from "@/actions/game";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import { GameFormSchema } from "@/lib/schema";
import { GameDetails, Player, SeasonWithState } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import PlayerFormSmall from "../player/player-form-small";
import SeasonTitle from "../season/season-title";
import { AvatarCheckbox } from "../ui/avatar-checkbox";
import { NumberInput } from "../ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PostgrestError } from "@supabase/supabase-js";

type Inputs = z.infer<typeof GameFormSchema>;
type GameFormProps = {
  players: Player[];
  seasons: SeasonWithState[];
  onClose?: () => void;
  game?: GameDetails;
};

function getPlayerIdsFromTeam(players: Player[] | undefined): number[] {
  return players?.map((player) => player.id) ?? [];
}

function excludePlayersByIds(idsToExclude: number[], players: Player[]): Player[] {
  return players.filter((player) => !idsToExclude.includes(player.id));
}

function filterPlayerIdsToInclude(ids: number[], players: Player[]): number[] {
  return ids.filter((id) => players.some((player) => player.id === id));
}

export default function GameForm({
  players,
  seasons,
  onClose,
  game,
}: GameFormProps) {
  const { toast } = useToast();
  const gameTeamRedPlayerIds = getPlayerIdsFromTeam(game?.team_red?.players);
  const gameTeamBluePlayerIds = getPlayerIdsFromTeam(game?.team_blue?.players);
  const [teamRedPlayers, setTeamRedPlayers] = useState<Player[]>(
    excludePlayersByIds(gameTeamBluePlayerIds, players),
  );
  const [teamBluePlayers, setTeamBluePlayers] = useState<Player[]>(
    excludePlayersByIds(gameTeamRedPlayerIds, players),
  );
  const form = useForm<Inputs>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: {
      team_red: {
        players: filterPlayerIdsToInclude(gameTeamRedPlayerIds, players),
        score: game?.team_red?.score || 0,
      },
      team_blue: {
        players: filterPlayerIdsToInclude(gameTeamBluePlayerIds, players),
        score: game?.team_blue?.score || 0,
      },
      season_id:
        game?.season_id || seasons[0]?.id || undefined,
    },
  });

  const handleUpdateGame = async (id: number, data: Inputs) => {
    const { error } = await updateGame(id, data);
    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
          (error as PostgrestError).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Game updated",
      description: `Game ${id} was updated successfully.`,
    });
    form.reset();
    if (onClose) {
      onClose();
    }
  };

  const handleCreateGame = async (data: Inputs) => {
    const { data: createdGame, error } = await createGame(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
        (error as PostgrestError).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Game created",
      description: `Game ${createdGame?.game_id} was created successfully.`,
    });
    form.reset();
    if (onClose) {
      onClose();
    }
  };

  const onSubmit = async (data: Inputs) => {
    if (game) {
      await handleUpdateGame(game.id, data);
    } else {
      await handleCreateGame(data);
    }
  };

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
                      <SeasonTitle startDate={season.start_date} />
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
                  <ul className="flex flex-wrap gap-3">
                    {players.map((player) => (
                      <li key={player.id}>
                        <FormField
                          control={form.control}
                          name="team_red.players"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex justify-center space-y-0">
                                <FormControl>
                                  <AvatarCheckbox
                                    title={player.name}
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
                      </li>
                    ))}
                    <PlayerFormSmall updatePlayers={updateTeamRedPlayers} />
                  </ul>
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
                  <ul className="flex flex-wrap gap-3">
                    {players.map((player) => (
                      <li key={player.id}>
                        <FormField
                          control={form.control}
                          name="team_blue.players"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <AvatarCheckbox
                                    title={player.name}
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
                      </li>
                    ))}
                    <PlayerFormSmall updatePlayers={updateTeamBluePlayers} />
                  </ul>
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
