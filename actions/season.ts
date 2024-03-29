"use server";

import { SeasonFormSchema } from "@/lib/schema";
import { Season, SeasonState } from "@/types/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "../lib/supabase/server";
import { SeasonWithState } from "./../types/types";

type SeasonFormInputs = z.infer<typeof SeasonFormSchema>;
type InsertSeason = Omit<Season, "id" | "created_at">;

export const getCachedSeasons = unstable_cache(
  async (seasonStates: SeasonState[] = []) => getSeasons(seasonStates),
  ["seasons"],
  {
    revalidate: 60,
    tags: ["seasons"],
  },
);

export const getCachedSeason = unstable_cache(
  async (id: number) => getSeason(id),
  ["season"],
  {
    revalidate: 60,
    tags: ["seasons"],
  },
);

export async function createSeason(inputData: SeasonFormInputs) {
  const supabase = createClient(cookies());
  const parsed = SeasonFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const seasonsRows: InsertSeason[] = [
    {
      start_date: parsed.data.start_date.toISOString(),
      end_date: parsed.data.end_date?.toISOString() ?? null,
    },
  ];

  const { data: seasonData, error: seasonError } = await supabase
    .from("seasons")
    .insert(seasonsRows)
    .select()
    .single();

  if (!seasonError) {
    revalidateTag("seasons");
  }
  return { data: seasonData, error: seasonError };
}

export async function updateSeason(id: number, inputData: SeasonFormInputs) {
  const supabase = createClient(cookies());
  const parsed = SeasonFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };
  const seasonsRow: InsertSeason = {
    start_date: parsed.data.start_date.toISOString(),
    end_date: parsed.data.end_date?.toISOString() ?? null,
  };

  const { data: seasonData, error: seasonError } = await supabase
    .from("seasons")
    .update(seasonsRow)
    .eq("id", id)
    .select()
    .single();

  if (!seasonError) {
    revalidateTag("seasons");
  }
  return { data: seasonData, error: seasonError };
}

export async function deleteSeason(id: number) {
  const supabase = createClient(cookies());
  const { error } = await supabase.from("seasons").delete().eq("id", id);

  if (!error) {
    revalidateTag("seasons");
  }
  return { error };
}

export async function getSeasons(seasonStates: SeasonState[] = []) {
  const supabase = createClient(cookies());
  let query = supabase
    .from("seasons_with_state")
    .select("*", { count: "exact" })
    .order("start_date", { ascending: false });

  if (seasonStates.length > 0) {
    query = query.in("state", seasonStates);
  }

  const { data, error, count } = await query.returns<SeasonWithState[]>();
  return { data, error, count };
}

export async function getSeason(id: number) {
  const supabase = createClient(cookies());
  const query = supabase.from("seasons_with_state").select("*").eq("id", id);
  const { data, error } = await query.returns<SeasonWithState[]>();
  return { data, error };
}
