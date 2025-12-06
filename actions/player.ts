"use server";

import { PlayerFormSchema } from "@/lib/schema";
import { createClient } from "../lib/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { Player } from "@/types/types";

type PlayerFormInputs = z.infer<typeof PlayerFormSchema>;

// Note: unstable_cache removed - incompatible with cookies() in Next.js 16
export async function getCachedPlayers(includeArchived: boolean = false) {
  return getPlayers(includeArchived);
}

export async function getCachedPlayer(id: number) {
  return getPlayer(id);
}

export async function createPlayer(inputData: PlayerFormInputs) {
  const supabase = createClient(await cookies());
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const { data, error } = await supabase
    .from("players")
    .insert([parsed.data])
    .select()
    .single();

  if (!error) {
    revalidateTag("players", "max");
  }

  return { data, error };
}

export async function updatePlayer(id: number, inputData: PlayerFormInputs) {
  const supabase = createClient(await cookies());
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const { data, error } = await supabase
    .from("players")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .single();

  if (!error) {
    revalidateTag("players", "max");
  }

  return { data, error };
}

export async function archivePlayer(id: number) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("players")
    .update({ is_archived: true })
    .eq("id", id)
    .select()
    .single();

  if (!error) {
    revalidateTag("players", "max");
  }

  return { data, error };
}

export async function uploadPlayerImage(formData: FormData) {
  const supabase = createClient(await cookies());
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
  const supabase = createClient(await cookies());
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
  const supabase = createClient(await cookies());
  const query = supabase.from("players").select("*").eq("id", id);
  const { data, error } = await query.returns<Player[]>();
  return { data, error };
}

function generateUniqueFilename(originalFilename: string) {
  const timestamp = Date.now();
  return `${timestamp}-${originalFilename}`;
}
