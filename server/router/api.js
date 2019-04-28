const express = require('express');
const router = express.Router();
const config = require('../../configs/config');
const requestClient = require('../../utils/redis-client');
requestClient.configure();
const DB_URL = config.DB_URL;

router.get('/healthz', (req, res) => res.sendStatus(200));

router.get('/movies', async (req, res) => {
  const methodsName = 'server.movies';
  const payload = createPayload('/data', 'GET', {
    ttl: 300
  }, methodsName);

  const movies = await requestClient.request(payload);

  res.send(movies);

});

const createPayload = (url, method, cache, cacheKey) => {
  return {
    url: url,
    method: method,
    cache: cache,
    cacheKey: cacheKey,
    host: config.apiHost,
    port: config.apiPort
  }
}
module.exports = router;
