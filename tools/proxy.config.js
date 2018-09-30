export default {
  mock: {
    '/api3': {
      changeOrigin: true,
      target: 'http://api3.mock.server.com',
    },
    '/api': {
      changeOrigin: true,
      target: 'http://api.mock.server.com',
      pathRewrite: {
        '^/api': '/api2/write/',
      },
    },
  },
  dev: {
    '/api3': {
      changeOrigin: true,
      target: 'http://api3.dev.server.com',
    },
    '/api': {
      changeOrigin: true,
      target: 'http://api.dev.server.com',
      pathRewrite: {
        '^/api': '/api2/write/',
      },
    },
  },
  qa: {
    '/api3': {
      changeOrigin: true,
      target: 'http://api3.qa.server.com',
    },
    '/api': {
      changeOrigin: true,
      target: 'http://api.qa.server.com',
      pathRewrite: {
        '^/api': '/api2/write/',
      },
    },
  },
  online: {
    '/api3': {
      changeOrigin: true,
      target: 'http://api3.server.com',
    },
    '/api': {
      changeOrigin: true,
      target: 'http://api.server.com',
      pathRewrite: {
        '^/api': '/api2/write/',
      },
    },
  },
};
