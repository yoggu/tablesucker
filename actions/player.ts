"use server";

import { PlayerFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidateTag } from "next/cache";

type PlayerFormInputs = z.infer<typeof PlayerFormSchema>;

export async function createPlayer(inputData: PlayerFormInputs) {
  const supabase = createClient(cookies());
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  try {
    const { data, error } = await supabase
      .from("players")
      .insert([parsed.data])
      .select()
      .single();

    if (error) return { data: null, error };

    revalidateTag("players");
    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updatePlayer(id: number, inputData: PlayerFormInputs) {
  const supabase = createClient(cookies());
  const parsed = PlayerFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  try {
    const { data, error } = await supabase
      .from("players")
      .update(parsed.data)
      .eq("id", id)
      .select()
      .single();

    if (error) return { data: null, error };
    revalidateTag("players");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function archivePlayer(id: number) {
  const supabase = createClient(cookies());

  try {
    const { data, error } = await supabase
      .from("players")
      .update({ is_archived: true })
      .eq("id", id)
      .select()
      .single();

    if (error) return { data: null, error };
    revalidateTag("players");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function uploadPlayerImage(formData: FormData) {
  const supabase = createClient(cookies());
  const file = formData.get("file") as File;

  if (!file) {
    return { data: null, error: new Error("No file provided") };
  }
  const uniqueFilename = generateUniqueFilename(file.name);

  try {
    const { data: uploadedFile, error: uploadedFileError } =
      await supabase.storage.from("players").upload(uniqueFilename, file);

    if (uploadedFileError) return { data: null, uploadedFileError };

    const publicUrl = supabase.storage
      .from("players")
      .getPublicUrl(uploadedFile.path);

    const data = { ...uploadedFile, publicUrl: publicUrl?.data?.publicUrl };

    return { data, error: uploadedFileError };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

function generateUniqueFilename(originalFilename: string) {
  const timestamp = Date.now();
  return `${timestamp}-${originalFilename}`;
}
