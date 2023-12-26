import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getSeasons() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from("seasons").select("*");
  return { data, error };
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

export async function getLatestActiveSeason() {
  const supabase = createClient(cookies());
  const today = new Date().toISOString();
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .or(`end_date.is.null,end_date.gte.${today}`)
    .order("start_date", { ascending: false })
    .limit(1)
    .single();

  return { data, error };
}

export function isCompletedSeason(dateString: string | null) {
  if (!dateString) return false;

  const endDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return endDate < today;
}
