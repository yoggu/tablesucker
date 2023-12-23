import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const cookieStore = cookies();
export const supabase = createClient(cookieStore);

export async function getSeasons() {
  const { data, error } = await supabase.from("seasons").select("*");
  return { data, error };
}

export function isCompletedSeason(dateString: string | null) {
  if (!dateString) return false;

  const endDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return endDate < today;
};
