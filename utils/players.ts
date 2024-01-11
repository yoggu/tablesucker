import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getPlayers() {
  const supabase = createClient(cookies());
  const { data, error, count } = await supabase
    .from("players")
    .select("*", { count: "exact" })
    .order("name", { ascending: true });
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
