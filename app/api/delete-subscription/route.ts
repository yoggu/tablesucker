
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const subscription = (await request.json()) as PushSubscription;
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  if (!subscription) {
    console.error("No subscription received.");
    return new Response("No subscription received.", { status: 400 });
  }

  console.log("delete subscription", subscription.endpoint);

  const { error } = await supabase
    .from("subscriptions")
    .delete()
    .eq("endpoint", subscription.endpoint);

  if (error) {
    console.error(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }

  return new Response(JSON.stringify("Sucessfully deleted entry"), {
    status: 200,
  });
}
