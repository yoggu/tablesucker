"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

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

import { SeasonFormSchema } from "@/utils/schema";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { Calendar } from "@/components/ui/calendar";
import SeasonTitle from "./season-title";
import { createSeason } from "@/actions/season";

type Inputs = z.infer<typeof SeasonFormSchema>;

export default function SeasonForm({ onClose }: { onClose?: () => void }) {
  const { toast } = useToast();
  const form = useForm<Inputs>({
    resolver: zodResolver(SeasonFormSchema),
    defaultValues: {
      start_date: new Date(),
      end_date: undefined,
    },
  });

  async function onSubmit(data: Inputs) {
    // Create a new Date object with only the year, month, and day. Adjusted for UTC.
    const startDate = new Date(
      Date.UTC(
        data.start_date.getFullYear(),
        data.start_date.getMonth(),
        data.start_date.getDate(),
      ),
    );
    let endDate = undefined;
    if (data.end_date) {
      endDate = new Date(
        Date.UTC(
          data.end_date.getFullYear(),
          data.end_date.getMonth(),
          data.end_date.getDate(),
        ),
      );
    }

    const { data: season, error: seasonError } = await createSeason({
      start_date: startDate,
      end_date: endDate,
    });
    if (seasonError) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
          (seasonError as Error).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Season created successfully",
      description: (
        <>
          <Link href={`/seasons/${season!.id}`}>
            <SeasonTitle date={season!.start_date} />
          </Link>{" "}
          was created successfully.
        </>
      ),
    });
    form.reset();
    if (onClose) {
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      disabled={(date) => {
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
                      disabled={(date) => {
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
