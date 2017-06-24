const redis = require('redis'),
      client = redis.createClient(),
      logger = require('../Winston/WinstonSession');

client.on("error", err => {
  logger.error(err);
});

module.exports = client;
