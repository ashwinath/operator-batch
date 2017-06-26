const schedule = require('node-schedule'),
      downloadWeather = require('./Services/WeatherService'),
      logger = require('./Winston/WinstonSession');

schedule.scheduleJob('*/5 * * * *', () => {
  logger.info("Job for <Weather> started.");
  downloadWeather();
});
