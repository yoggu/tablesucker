import { cookies } from 'next/headers';
import { createClient } from './supabase/server';


export async function getPlayers() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from("players").select("*");
  return { data, error };
}
