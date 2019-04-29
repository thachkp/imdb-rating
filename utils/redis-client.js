const Redis = require('ioredis');
const _ = require('lodash');
const flat = require("flat");
const axios = require('axios');
const config = require('../configs/config');

const requestClient = {
  configure: function () {
    this.configuration = config;
    if (this.configuration.redisConfiguration) {
      let redis = new Redis(this.configuration.redisConfiguration);
      let error = undefined;
      redis.on("error", function (err) {
        console.log("Redis error " + err);
        error = err;
      });
      this.configuration.redisClient = redis;
    }
  },
  request: function async (request) {
    let configuration = this.configuration;
    if (request.cache) {
      return new Promise(async (resolve, reject) => {
        let fromCache = undefined;
        if (this.configuration.redisClient.status === 'ready') {
          fromCache = await cacheGet(configuration, request.cacheKey);
        }
        if (fromCache) {
          resolve(fromCache);
        } else {
          const response = await sendRequest(request).catch(err => {
            reject(err);
          });
          if (this.configuration.redisClient.status === 'ready') {
            cacheSet(configuration, request.cacheKey, response.data, request.cache.ttl);
          }
          resolve(response.data);
        }
      });
    }
  },
}

async function sendRequest(request) {
  const options = {
    proxy: request.host && request.port ? {
      host: request.host,
      port: request.port
    } : {},
    url: request.url,
    method: request.method,
  };

  const response = await axios(options);
  return await handleResponse(response);
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
}

function cacheDelete(configuration, key, callback) {
  if (configuration.redisClient) {
    return new Promise((resolve, reject) => {
      configuration.redisClient.keys(key + "*", function (err, keys) {
        if (err) {
          reject(err);
        }
        if (keys.length) {
          configuration.redisClient.del(keys, function (err, response) {
            if (err) {
              reject(err)
            } else if (response !== 1) {
              reject(new Error("Could not delete keys"))
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
  }
}

function cacheGet(configuration, key) {
  if (configuration.redisClient) {
    return new Promise((resolve, reject) => {
      configuration.redisClient.get(key, function (err, data) {
        if (!err) {
          let flattenedObj = JSON.parse(data);
          resolve(flat.unflatten(flattenedObj));
        } else {
          resolve(undefined);
        }
      });
    });
  }
}

function cacheSet(configuration, key, data, expiresIn) {
  if (configuration.redisClient) {
    configuration.redisClient.setex(key, expiresIn, "" + JSON.stringify(_.flatten(data)));
  }
}

module.exports = requestClient;
