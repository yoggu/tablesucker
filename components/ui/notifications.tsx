"use client";

import { subscribe } from "@/lib/webpush";
import { Bell, BellRing } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);
  // const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsNotificationSupported(
      () =>
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window,
    );
  }, []);

  return (
    <>
      {isNotificationSupported && (
        <Button variant="ghost" size="icon" onClick={subscribe}>
          <Bell width={20} height={20} />
        </Button>
      )}
    </>
  );
}
