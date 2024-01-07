import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getPlayers() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("name", { ascending: true });
  return { data, error };
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
