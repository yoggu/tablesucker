import { createClient } from "@/lib/supabase/server";
import { Subscription } from "@/types/types";
import { cookies } from "next/headers";
import webpush, { PushSubscription } from "web-push";

webpush.setVapidDetails(
  "mailto:test@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const query = supabase
  .from("subscriptions")
    .select("*");

  const { data, error } = await query.returns<Subscription[]>();

  if (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }

  data.forEach((row) => {
    const pushSubscription: PushSubscription = JSON.parse(row.subscription);
    const payload = JSON.stringify({
      title: "New message",
      body: "This is a test message.",
    });
    webpush.sendNotification(pushSubscription, payload).catch((error) => {
      console.error(error);
    });
  });

  return new Response("Notification sent", { status: 200 });
}
