"use client";
import { SeasonWithState } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SeasonBadge from "./season-badge";
import SeasonTitle from "./season-title";

type SeasonSelectorProps = {
  seasons: SeasonWithState[];
};

const SeasonSelectorSchema = z.object({
  season_id: z.string().min(1, "Please select a season"),
});

type Inputs = {
  season_id: string;
};

export default function SeasonSelector({ seasons }: SeasonSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<Inputs>({
    resolver: zodResolver(SeasonSelectorSchema),
    defaultValues: {
      season_id:
        seasons && seasons.length > 0 ? seasons[0]?.id?.toString() : "",
    },
  });

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  async function onSubmit(data: Inputs) {
    const newUrl = `${pathname}?${createQueryString("season", data.season_id)}`;
    router.push(newUrl);
  }

  const handleSelectChange = (value: string) => {
    form.setValue("season_id", value);
    form.handleSubmit(onSubmit)(); // Immediately invoke the returned function
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
                onValueChange={handleSelectChange}
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
                      <span className="flex gap-3">
                        <SeasonTitle startDate={season.start_date} />
                        <SeasonBadge state={season.state} />
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
