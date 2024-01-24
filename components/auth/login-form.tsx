"use client";

import { signIn } from "@/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import { LoginFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Inputs = z.infer<typeof LoginFormSchema>;

export default function LoginForm({ onClose }: { onClose?: () => void }) {
  const { toast } = useToast();
  const form = useForm<Inputs>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    const { error } = await signIn(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
        (error as AuthError).message || "An unexpected error occurred.",
      });
      return;
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  );
}
