import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { Subscription } from "@/types/types";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import webpush, { PushSubscription } from "web-push";

type NotificationResult = {
  status: "fulfilled" | "rejected";
  value: Subscription;
  reason?: any;
};

webpush.setVapidDetails(
  "https://tablesucker.vercel.app",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const body = await request.json();

  const teamRedScore = body.record.team_red_score;
  const teamBlueScore = body.record.team_blue_score;

  if (teamRedScore !== 0 && teamBlueScore !== 0) {
    return new Response("No notification sent", { status: 200 });
  }

  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*")
    .returns<Subscription[]>();

  if (subscriptionError) {
    return new Response(JSON.stringify(subscriptionError.message), {
      status: 500,
    });
  }

  let messageTitle = "";
  if (teamRedScore === 0) {
    messageTitle = "Team Red just got table sucked!";
  } else if (teamBlueScore === 0) {
    messageTitle = "Team Blue just got table sucked!";
  }

  const payload = JSON.stringify({
    title: messageTitle,
    body: "Check out the latest game results",
    url: "https://tablesucker.vercel.app",
  });

  const results = await sendNotifications(subscriptionData, payload);
  const invalidSubscriptions = results
    .filter((result) => result.status === "rejected" && (result.reason.statusCode === 410 || result.reason.statusCode === 404))
    .map((result) => result.value);
  await deleteInvalidSubscriptions(invalidSubscriptions);

  return new Response("Notification sent", { status: 200 });
}

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*")
    .returns<Subscription[]>();

  if (subscriptionError) {
    return new Response(JSON.stringify(subscriptionError.message), {
      status: 500,
    });
  }

  const payload = JSON.stringify({
    title: "test notification",
    body: "Check out the latest game results",
    url: "https://tablesucker.vercel.app",
  });

  const results = await sendNotifications(subscriptionData, payload);
  const invalidSubscriptions = results
    .filter((result) => result.status === "rejected" && (result.reason.statusCode === 410 || result.reason.statusCode === 404))
    .map((result) => result.value);
  await deleteInvalidSubscriptions(invalidSubscriptions);

  return new Response("Notification sent", { status: 200 });
}

function sendNotifications(
  subscriptionData: Subscription[],
  payload: string,
): Promise<NotificationResult[]> {
  const sendNotificationPromises = subscriptionData.map((row) => {
    const pushSubscription: PushSubscription = JSON.parse(row.subscription);
    return webpush
      .sendNotification(pushSubscription, payload)
      .then(() => ({ status: "fulfilled", value: row }))
      .catch((error) => ({ status: "rejected", reason: error, value: row }));
  });

  return Promise.allSettled(sendNotificationPromises) as Promise<
    NotificationResult[]
  >;
}

async function deleteInvalidSubscriptions(subscriptionData: Subscription[]) {
  const supabase = createServiceClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  const { error } = await supabase
    .from("subscriptions")
    .delete()
    .in(
      "endpoint",
      subscriptionData.map((row) => row.endpoint),
    );

  if (error) {
    console.error(error);
  }
}
