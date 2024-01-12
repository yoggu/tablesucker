"use server";

import { SeasonFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { Season } from "@/types/types";

type SeasonFormInputs = z.infer<typeof SeasonFormSchema>;
type InsertSeason = Omit<Season, "id" | "created_at">;

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

    revalidateTag("seasons");
    return { data: seasonData, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
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

    revalidateTag("seasons");
    return { data: seasonData, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function deleteSeason(seasonId: number) {
  const supabase = createClient(cookies());
  try {
    const { error: seasonError } = await supabase
      .from("seasons")
      .delete()
      .eq("id", seasonId);

    revalidateTag("seasons");
    return { error: seasonError };
  } catch (error) {
    return { error: error as Error };
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
  try {
    const { data, error, count } = await query;
    return { data, error, count };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getSeasonById(id: number) {
  const supabase = createClient(cookies());
  try {
    const { data, error } = await supabase
      .from("seasons")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  } catch (error) {
    return { error: error as Error };
  }
}
