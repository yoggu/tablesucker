"use server";
import { LoginFormSchema } from "./../utils/schema";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

type LoginFormInputs = z.infer<typeof LoginFormSchema>;

export const signOut = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect("/login");
};

export const signIn = async (data: LoginFormInputs) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const parsed = LoginFormSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten() };

  const { email, password } = parsed.data;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error };

  return redirect("/");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};
