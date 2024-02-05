"use client";

import { subscribe, hasSubscription, unsubscribe } from "@/lib/webpush";
import { Bell, BellOff, BellRing } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { useToast } from "@/lib/hooks/use-toast";

export default function Notifications() {
  const { toast } = useToast();
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsNotificationSupported(
      () =>
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window,
    );
    const checkSubscription = async () => {
      const isSubscribed = await hasSubscription();
      setIsSubscribed(isSubscribed);
    };
    checkSubscription();
  }, []);

  async function handleSubscribe() {
    try {
      await subscribe();
      toast({ variant: "default", title: "Sucessfully subscribed" });
      setIsSubscribed(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
      });
    }
  }

  async function handleUnsubscribe() {
    try {
      await unsubscribe();
      toast({ variant: "default", title: "Sucessfully unsubscribed" });
      setIsSubscribed(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
      });
    }
  }

  if (isSubscribed) {
    return (
      <Button variant="ghost" size="icon" onClick={handleUnsubscribe}>
        <BellOff width={20} height={20} />
      </Button>
    );
  }

  return (
    <>
      {isNotificationSupported && (
        <Button variant="ghost" size="icon" onClick={handleSubscribe}>
          <BellRing width={20} height={20} />
        </Button>
      )}
    </>
  );
}
