"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/utils/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { PlayerFormSchema } from "@/utils/schema";
import { createPlayer } from "@/actions/player";

type Inputs = z.infer<typeof PlayerFormSchema>;

export default function PlayerForm() {
  const { toast } = useToast();
  const form = useForm<Inputs>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: Inputs) {
    const { data: player, error } = await createPlayer(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description: (error as Error).message || "An unexpected error occurred.",
      });
      return;
    }
    if (player) {
      toast({
        title: "Player created successfully",
        description: `${player[0].name} was created successfully.`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
