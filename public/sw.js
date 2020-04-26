/* eslint-env: serviceWorker */
self.addEventListener('error', function (e) {
  self.clients.matchAll().then(function (clients) {
    if (clients && clients.length) {
      clients[0].postMessage({
        type: 'ERROR',
        msg: e.message || null,
        stack: e.error ? e.error.stack : null,
      });
    }
  });
});

self.addEventListener('unhandledrejection', function (e) {
  self.clients.matchAll().then(function (clients) {
    if (clients && clients.length) {
      clients[0].postMessage({
        type: 'REJECTION',
        msg: e.reason ? e.reason.message : null,
        stack: e.reason ? e.reason.stack : null,
      });
    }
  });
});

importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js');
workbox.setConfig({
  debug: true,
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/',
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// api 网络优先，只能缓存 GET 请求
workbox.routing.registerRoute(
  /\/api\d?\//i,
  new workbox.strategies.NetworkFirst({
    cacheName: 'api',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
      }),
    ],
  })
);

// html 网络优先
workbox.routing.registerRoute(
  /.+\.(html|htm)$/i,
  new workbox.strategies.NetworkFirst({
    cacheName: 'html',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 5,
      }),
    ],
  })
);

// CDN 缓存优先
workbox.routing.registerRoute(
  /.+(cdn.jsdelivr.net|g.alicdn.com)/i,
  new workbox.strategies.CacheFirst({
    cacheName: 'supplier:cdn',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })
);

// css或js，后台定期更新
workbox.routing.registerRoute(
  /.+\.(css|js)$/i,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        // 保持 100 条目
        maxEntries: 100,
        // 最大缓存时间 7 天
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// 图片 缓存优先
workbox.routing.registerRoute(
  /.+\.(png|gif|jpg|jpeg|webp|bmp|svg)/i,
  new workbox.strategies.CacheFirst({
    cacheName: 'image',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        // 保持 200 条目
        maxEntries: 200,
        // 最大缓存时间 30 天
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // 超出磁盘限制自动删除
        purgeOnQuotaError: true,
      }),
    ],
  })
);
