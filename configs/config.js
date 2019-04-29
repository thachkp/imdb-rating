module.exports = {
  sys: process.env.APP_NAME,
  redisConfiguration: {
    name: process.env.REDIS_NAME,
    sentinels: [{
      host: process.env.REDIS_SENTINEL_1,
      port: process.env.REDIS_PORT
    }, {
      host: process.env.REDIS_SENTINEL_2,
      port: process.env.REDIS_PORT
    }, {
      host: process.env.REDIS_SENTINEL_3,
      port: process.env.REDIS_PORT
    }]
  },
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT
}
