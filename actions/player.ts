"use server";

import { PlayerFormSchema } from "@/lib/schema";
import { createClient } from "../lib/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidateTag, unstable_cache } from "next/cache";
import { Player } from "@/types/types";

type PlayerFormInputs = z.infer<typeof PlayerFormSchema>;

export const getCachedPlayers = unstable_cache(
  async (includeArchived: boolean = false) => getPlayers(includeArchived),
  ["players"],
  {
    revalidate: 60,
    tags: ["players"],
  },
);

export const getCachedPlayer = unstable_cache(
  async (id: number) => getPlayer(id),
  ["player"],
  {
    revalidate: 60,
    tags: ["players"],
  },
);

export async function createPlayer(inputData: PlayerFormInputs) {
  const supabase = createClient(cookies());
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const { data, error } = await supabase
    .from("players")
    .insert([parsed.data])
    .select()
    .single();

  if (!error) {
    revalidateTag("players");
  }

  return { data, error };
}

export async function updatePlayer(id: number, inputData: PlayerFormInputs) {
  const supabase = createClient(cookies());
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const { data, error } = await supabase
    .from("players")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .single();

  if (!error) {
    revalidateTag("players");
  }

  return { data, error };
}

export async function archivePlayer(id: number) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("players")
    .update({ is_archived: true })
    .eq("id", id)
    .select()
    .single();

  if (!error) {
    revalidateTag("players");
  }

  return { data, error };
}

export async function uploadPlayerImage(formData: FormData) {
  const supabase = createClient(cookies());
  const file = formData.get("file") as File;

  if (!file) {
    return { data: null, error: new Error("No file provided") };
  }
  const uniqueFilename = generateUniqueFilename(file.name);

  const { data: uploadedFile, error: uploadedFileError } =
    await supabase.storage.from("players").upload(uniqueFilename, file);

  if (uploadedFileError) return { data: null, uploadedFileError };

  const publicUrl = supabase.storage
    .from("players")
    .getPublicUrl(uploadedFile.path);

  const data = { ...uploadedFile, publicUrl: publicUrl?.data?.publicUrl };

  return { data, error: uploadedFileError };
}

export async function getPlayers(includeArchived: boolean = false) {
  const supabase = createClient(cookies());
  const query = supabase
    .from("players")
    .select("*", { count: "exact" })
    .order("name", { ascending: true });

  if (!includeArchived) {
    query.eq("is_archived", false);
  }

  const { data, error, count } = await query.returns<Player[]>();
  return { data, error, count };
}

export async function getPlayer(id: number) {
  const supabase = createClient(cookies());
  const query = supabase.from("players").select("*").eq("id", id);
  const { data, error } = await query.returns<Player[]>();
  return { data, error };
}

function generateUniqueFilename(originalFilename: string) {
  const timestamp = Date.now();
  return `${timestamp}-${originalFilename}`;
}
