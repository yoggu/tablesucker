"use server";

import { SeasonFormSchema } from "@/lib/schema";
import { Season, SeasonState } from "@/types/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "../lib/supabase/server";
import { SeasonWithState } from "./../types/types";

type SeasonFormInputs = z.infer<typeof SeasonFormSchema>;
type InsertSeason = Omit<Season, "id" | "created_at">;

// Note: unstable_cache removed - incompatible with cookies() in Next.js 16
// These functions now directly call the getters
export async function getCachedSeasons(seasonStates: SeasonState[] = []) {
  return getSeasons(seasonStates);
}

export async function getCachedSeason(id: number) {
  return getSeason(id);
}

export async function createSeason(inputData: SeasonFormInputs) {
  const supabase = createClient(await cookies());
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
    revalidateTag("seasons", "max");
  }
  return { data: seasonData, error: seasonError };
}

export async function updateSeason(id: number, inputData: SeasonFormInputs) {
  const supabase = createClient(await cookies());
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
    revalidateTag("seasons", "max");
  }
  return { data: seasonData, error: seasonError };
}

export async function deleteSeason(id: number) {
  const supabase = createClient(await cookies());
  const { error } = await supabase.from("seasons").delete().eq("id", id);

  if (!error) {
    revalidateTag("seasons", "max");
  }
  return { error };
}

export async function getSeasons(seasonStates: SeasonState[] = []) {
  const supabase = createClient(await cookies());
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
  const supabase = createClient(await cookies());
  const query = supabase.from("seasons_with_state").select("*").eq("id", id);
  const { data, error } = await query.returns<SeasonWithState[]>();
  return { data, error };
}
