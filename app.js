const schedule = require('node-schedule'),
      downloadWeather = require('./Services/WeatherService'),
      downloadNews = require('./Services/NewsServices'),
      NewsContract = require('./Contracts/NewsContract'),
      logger = require('./Winston/WinstonSession');

logger.info("Operator Batch has started.");

/**
 * Weather Job
 */
schedule.scheduleJob('*/5 * * * *', () => {
  logger.info("Job for Weather started.");
  downloadWeather();
});

/**
 * News Jobs
 */
schedule.scheduleJob('*/30 * * * *', () => {
  logger.info(`Job for News:${NewsContract.BBC} started.`);
  downloadNews(NewsContract.BBC);
});

schedule.scheduleJob('*/30 * * * *', () => {
  logger.info(`Job for News:${NewsContract.TECHCRUNCH} started.`);
  downloadNews(NewsContract.TECHCRUNCH);
});

schedule.scheduleJob('*/30 * * * *', () => {
  logger.info(`Job for News:${NewsContract.BLOOMBERG} started.`);
  downloadNews(NewsContract.BLOOMBERG);
});

schedule.scheduleJob('*/30 * * * *', () => {
  logger.info(`Job for News:${NewsContract.BUSINESS_INSIDER} started.`);
  downloadNews(NewsContract.BUSINESS_INSIDER);
});

schedule.scheduleJob('*/30 * * * *', () => {
  logger.info(`Job for News:${NewsContract.REUTERS} started.`);
  downloadNews(NewsContract.REUTERS);
});
