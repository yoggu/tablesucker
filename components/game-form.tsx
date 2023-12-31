"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/utils/hooks/use-toast";
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

import { GameFormSchema } from "@/utils/schema";
import { createGame } from "@/actions/game";
import { Player, Season } from "@/types/types";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import SeasonTitle from "./season-title";

type Inputs = z.infer<typeof GameFormSchema>;
type GameFormProps = {
  players: Player[];
  seasons: Season[];
};

export default function GameForm({ players, seasons }: GameFormProps) {
  const { toast } = useToast();
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
      season_id: seasons && seasons.length > 0 ? seasons[0]?.id?.toString() : ""
    },
  });

  async function onSubmit(data: Inputs) {
    const { data: game, error } = await createGame(data);
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
      description: `Game with ID ${game!.id} was created.`,
    });
  }

  return (
    <>
      <h2>Add Game</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
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
                      <SelectItem
                        key={season.id}
                        value={season?.id?.toString()}
                      >
                        <SeasonTitle date={season.start_date} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <div>
              <span>Team Red</span>
              <div>
                <FormField
                  control={form.control}
                  name="team_red.players"
                  render={() => (
                    <FormItem>
                      {players.map((player) => (
                        <FormField
                          key={player.id}
                          control={form.control}
                          name="team_red.players"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={player.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(player.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field?.value,
                                            player.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== player.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {player.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team_red.score"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="score" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <span>Team Blue</span>
              <div>
                <FormField
                  control={form.control}
                  name="team_blue.players"
                  render={() => (
                    <FormItem>
                      {players.map((player) => (
                        <FormField
                          key={player.id}
                          control={form.control}
                          name="team_blue.players"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={player.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(player.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field?.value,
                                            player.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== player.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {player.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team_blue.score"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="score" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
