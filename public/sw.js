self.addEventListener("push", async (event) => {
  if (event.data) {
    const { title, body, url } = await event.data.json();
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: "/images/manifest-icon-192.maskable.png",
        data: {
          url: url,
        },
      }),
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("On notification click: ", event.notification.tag);
  const url = event.notification.data.url;
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      }),
  );
});

