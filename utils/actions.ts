"use server";

import { PlayerFormSchema } from "@/lib/schema";
import { createClient } from "./supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type PlayerFormInputs = z.infer<typeof PlayerFormSchema>;

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function createPlayer(inputData: PlayerFormInputs) {
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  try {
    const { data, error } = await supabase.from("players").insert([parsed.data]).select();
    if (error) return { data: null, error };
    revalidatePath("/players");
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}
