import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getPlayers(includeArchived: boolean = false) {
  const supabase = createClient(cookies());
  const query = supabase
    .from("players")
    .select("*", { count: "exact" })
    .order("name", { ascending: true });

  if (!includeArchived) {
    query.eq("is_archived", false);
  }
  const { data, error, count } = await query;

  return { data, error, count };
}

export async function getPlayerById(id: number) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
