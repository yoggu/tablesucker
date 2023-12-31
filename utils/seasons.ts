import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getSeasons( activeOnly: boolean = false) {
  const supabase = createClient(cookies());
  const query = supabase.from("seasons").select("*");

  if (activeOnly) {
    const today = new Date().toISOString();
    query.or(`end_date.is.null,end_date.gte.${today}`);
  }

  query.order("start_date", { ascending: false });
  const { data, error } = await query;
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

export function isCompletedSeason(dateString: string | null) {
  if (!dateString) return false;

  const endDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return endDate < today;
}
