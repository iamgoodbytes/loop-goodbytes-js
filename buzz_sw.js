self.addEventListener('install', function(event) {
    // Perform install steps
    // https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
    // https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/
    console.log("service worker is installing stuff, like cache");
});

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    var jsonData = event.data.json();
    
    const title = jsonData.title;
    const options = {
        body: jsonData.body,
        icon: jsonData.icon,
        badge: jsonData.icon || "https://buzz.goodbytes.be/images/sample_push_icon.png",
        tag: 'goodbytes-buzz-push', // this re-uses an existing notification
        actions: jsonData.actions || []
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    //https://github.com/cretueusebiu/laravel-web-push-demo/blob/master/public/sw.js
    
    console.log('[Service Worker] Notification click Received.');
    console.log(event);

    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});