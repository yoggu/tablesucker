"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useToast } from "@/lib/hooks/use-toast";

import { createSeason, updateSeason } from "@/actions/season";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SeasonFormSchema } from "@/lib/schema";
import { cn, transformDateToUTC } from "@/lib/utils";
import { SeasonWithState } from "@/types/types";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import SeasonTitle from "./season-title";
import { PostgrestError } from "@supabase/supabase-js";

type Inputs = z.infer<typeof SeasonFormSchema>;

type SeasonFromProps = {
  season?: SeasonWithState;
  onClose?: () => void;
};

export default function SeasonForm({ season, onClose }: SeasonFromProps) {
  const { toast } = useToast();
  const form = useForm<Inputs>({
    resolver: zodResolver(SeasonFormSchema),
    defaultValues: {
      start_date: season?.start_date ? new Date(season.start_date) : new Date(),
      end_date: season?.end_date ? new Date(season.end_date) : undefined,
    },
  });

  const handleUpdateSeason = async (id: number, data: Inputs) => {
    const startDate = transformDateToUTC(data.start_date);
    const endDate = data.end_date ? transformDateToUTC(data.end_date) : undefined;

    const { data: season, error: seasonError } = await updateSeason(id, {
      start_date: startDate,
      end_date: endDate,
    });

    if (seasonError || !season) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
        (seasonError as PostgrestError).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Season updated",
      description: (
        <>
          <Link href={`/seasons/${season.id}`}>
            <SeasonTitle startDate={season.start_date} />
          </Link>{" "}
          was updated successfully.
        </>
      ),
    });
    form.reset();
    if (onClose) {
      onClose();
    }
  };

  const handleCreateSeason = async (data: Inputs) => {
    const startDate = transformDateToUTC(data.start_date);
    const endDate = data.end_date ? transformDateToUTC(data.end_date) : undefined;
    const { data: season, error: seasonError } = await createSeason({
      start_date: startDate,
      end_date: endDate,
    });
    if (seasonError || !season) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
          (seasonError as PostgrestError).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Season created",
      description: (
        <>
          <Link href={`/seasons/${season.id}`}>
            <SeasonTitle startDate={season.start_date} />
          </Link>{" "}
          was created successfully.
        </>
      ),
    });
    form.reset();
    if (onClose) {
      onClose();
    }
  };

  const onSubmit = async (data: Inputs) => {
    if (season) {
      await handleUpdateSeason(season.id, data);
    } else {
      await handleCreateSeason(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <div>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={season ? false : (date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <div>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={season ? false : (date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormDescription>
                Optional. If left blank, the season will be ongoing until
                cancled.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
