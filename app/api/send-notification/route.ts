import { createClient } from "@/lib/supabase/server";
import { transformGameDetail } from "@/lib/utils";
import { GameDetails, GameDetailsView, Subscription } from "@/types/types";
import { cookies } from "next/headers";
import webpush, { PushSubscription } from "web-push";

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
  const gameID = body.record.id;

  if (teamRedScore !== 0 && teamBlueScore !== 0) {
    return new Response("No notification sent", { status: 200 });
  }

  // const { data: gameData, error: gameError } = await supabase
  //   .from("game_details")
  //   .select("*")
  //   .eq("id", gameID)
  //   .returns<GameDetailsView[]>();

  // if (gameError) {
  //   return new Response(JSON.stringify(gameError.message), {
  //     status: 500,
  //   });
  // }

  // if (!gameData || gameData.length === 0) {
  //   return new Response("No game found", { status: 404 });
  // }

  // const gameDetail: GameDetails = transformGameDetail(gameData[0]);

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
    url: 'https://tablesucker.vercel.app'
  });

  subscriptionData.forEach((row) => {
    const pushSubscription: PushSubscription = JSON.parse(row.subscription);
    webpush.sendNotification(pushSubscription, payload).catch((error) => {
      console.error(error);
    });
  });

  return new Response("Notification sent", { status: 200 });
}
