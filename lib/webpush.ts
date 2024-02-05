export async function unregisterServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((registration) => registration.unregister()),
  );
}

export async function hasSubscription() {
  const swRegistration = await navigator.serviceWorker.getRegistration();
  const subscription = await swRegistration?.pushManager.getSubscription();
  console.log("currentSubscription", subscription);
  return !!subscription;
}

export async function unsubscribe() {
  const swRegistration = await navigator.serviceWorker.getRegistration();
  const subscription = await swRegistration?.pushManager.getSubscription();

  if (!subscription) {
    throw new Error("No subscription found.");
  }

  await swRegistration?.unregister();

  return await deleteSubscription(subscription);
}

export async function subscribe() {
  await unregisterServiceWorkers();

  const swRegistration = await navigator.serviceWorker.register("/sw.js");
  await window?.Notification.requestPermission();

  const options = {
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    userVisibleOnly: true,
  };
  const subscription = await swRegistration.pushManager.subscribe(options);

  return await saveSubscription(subscription);
}

async function saveSubscription(subscription: PushSubscription) {
  const response = await fetch("/api/save-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

async function deleteSubscription(subscription: PushSubscription) {
  const response = await fetch("/api/delete-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
