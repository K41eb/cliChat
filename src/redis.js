
var redis = require('redis');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
redisClient = redis.createClient(6379);


function resetRedis(value) {
  return redisClient.flushallAsync();
}

function setStringInRedis(key, value) {
  return redisClient.setAsync(key, value);
}

function getStringFromRedis(key) {
  return redisClient.getAsync(key);
}


module.exports = {
  resetRedis,
  setStringInRedis,
  getStringFromRedis,
};
