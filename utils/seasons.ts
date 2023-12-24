import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export const cookieStore = cookies();
export const supabase = createClient(cookieStore);

export async function getSeasons() {
  const { data, error } = await supabase.from("seasons").select("*");
  return { data, error };
}

export async function getLatestActiveSeason() {
  const today = new Date().toISOString();
  console.log(today);
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
