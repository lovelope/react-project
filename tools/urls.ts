export default {
  dev: {
    DOMAIN: 'https://fe.dev.com/',
    CDN: 'https://cdn.server.com/project/dev/',
    // 私有 sourceMap 服务器，确保只可以通过公司 VPN 访问
    PRIVATE_SOURCE_MAP_SERVER: 'https://private.map.server.com/project/dev/',
  },
  qa: {
    DOMAIN: 'https://fe.qa.com/',
    CDN: 'https://cdn.server.com/project/qa/',
    PRIVATE_SOURCE_MAP_SERVER: 'https://private.map.server.com/project/qa/',
  },
  pl: {
    DOMAIN: 'https://fe.pl.com/',
    CDN: 'https://cdn.server.com/project/pl/',
    PRIVATE_SOURCE_MAP_SERVER: 'https://private.map.server.com/project/pl/',
  },
  online: {
    DOMAIN: 'https://fe.com/',
    CDN: 'https://cdn.server.com/project/online/',
    PRIVATE_SOURCE_MAP_SERVER: 'https://private.map.server.com/project/online/',
  },
};
