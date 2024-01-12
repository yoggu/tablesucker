"use server";

import { SeasonFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Season } from "@/types/types";

type SeasonFormInputs = z.infer<typeof SeasonFormSchema>;
type InsertSeason = Omit<Season, "id" | "created_at">;
type UpdateSeason = Omit<Season, "created_at">;

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
  try {
    const { data: seasonData, error: seasonError } = await supabase
      .from("seasons")
      .insert(seasonsRows)
      .select()
      .single();
    if (seasonError) return { data: null, error: seasonError };

    revalidatePath("/seasons");
    return { data: seasonData, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateSeason(
  seasonId: number,
  inputData: SeasonFormInputs,
) {
  const supabase = createClient(cookies());
  const parsed = SeasonFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const seasonsRow: InsertSeason = {
    start_date: parsed.data.start_date.toISOString(),
    end_date: parsed.data.end_date?.toISOString() ?? null,
  };
  try {
    const { data: seasonData, error: seasonError } = await supabase
      .from("seasons")
      .update(seasonsRow)
      .eq("id", seasonId)
      .select()
      .single();
    if (seasonError) return { data: null, error: seasonError };

    revalidatePath("/seasons");
    return { data: seasonData, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteSeason(seasonId: number) {
  const supabase = createClient(cookies());
  try {
    const { error: seasonError } = await supabase
      .from("seasons")
      .delete()
      .eq("id", seasonId);

    revalidatePath("/seasons");
    return { error: seasonError };
  } catch (error) {
    return { error };
  }
}

export async function getSeasons(activeOnly: boolean = false) {
  const supabase = createClient(cookies());
  const query = supabase.from("seasons").select("*", { count: "exact" });

  if (activeOnly) {
    const today = new Date().toISOString();
    query.or(`end_date.is.null,end_date.gte.${today}`);
  }

  query.order("start_date", { ascending: false });
  const { data, error, count } = await query;
  return { data, error, count };
}

export async function getSeasonById(id: number) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
