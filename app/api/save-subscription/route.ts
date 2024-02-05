import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const subscription = (await request.json()) as PushSubscription;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!subscription) {
    console.error("No subscription received.");
    return new Response("No subscription received.", { status: 400 });
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .insert([
      {
        subscription: JSON.stringify(subscription),
        endpoint: subscription.endpoint,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
