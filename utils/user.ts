import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
