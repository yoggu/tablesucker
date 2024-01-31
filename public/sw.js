self.addEventListener("push", async (event) => {
  if (event.data) {
    const { title, body } = await event.data.json();

    self.registration.showNotification(title, {
      body,
      icon: "/images/manifest-icon-192.maskable.png",
    });
  }
});
