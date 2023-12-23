import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const cookieStore = cookies();
export const supabase = createClient(cookieStore);

export async function getPlayers() {
  const { data, error } = await supabase.from("players").select("*");
  return { data, error };
}
