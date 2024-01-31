export async function unregisterServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((registration) => registration.unregister()),
  );
}


export async function subscribe() {
  await unregisterServiceWorkers();

  const swRegistration = await navigator.serviceWorker.register("/sw.js");
  await window?.Notification.requestPermission();


  try {
    const options = {
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true,
    }

    const subscription = await swRegistration.pushManager.subscribe(options);

    await saveSubscription(subscription);
  } catch (error) {
    console.error(error);
  }
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

  return await response.json()
}
