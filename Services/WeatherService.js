const axios = require('axios'),
      logger = require('../Winston/WinstonSession'),
      redis = require('../Redis/RedisSession'),
      WeatherContract = require('../Contracts/WeatherContract'),
      _ = require('lodash');

const encodedUri = encodeURI(`http://api.openweathermap.org/data/2.5/forecast/daily?q=Singapore&units=metric&cnt=14&apikey=${process.env.OPENWEATHERMAP_API_KEY}`);

/**
 * Downloads 14 days worth of OpenWeatherMap data into redis server.
 */
function downloadWeather(callback) {
  axios.get(encodedUri)
    .then(handleResponse)
    .then(callback)
    .catch(handleError);
}

function handleError(err) {
  logger.error(err);
}

function handleResponse(response) {
  if (response.data.list) {
    persist(response.data.list)
  } else {
    logger.error('Response was empty');
  }
}

function persist(list) {
  _.range(14).forEach(iterator => {
    const dayForecast = list[iterator];
    redis.HMSET(`Weather:${iterator}`, [
      WeatherContract.MAX, dayForecast.temp.min,
      WeatherContract.MIN, dayForecast.temp.max,
      WeatherContract.PRESSURE, dayForecast.pressure,
      WeatherContract.HUMIDITY, dayForecast.humidity,
      WeatherContract.WEATHER_ID, dayForecast.weather[0].id,
      WeatherContract.WEATHER_DESC, dayForecast.weather[0].description,
      WeatherContract.WEATHER_ICON, dayForecast.weather[0].icon,
      WeatherContract.WIND_SPEED, dayForecast.speed,
      WeatherContract.WIND_DIRECTION, dayForecast.deg
    ], (err, res) => {
      if (err) {
        logger.error(`Error persisting day[${iteator}]`);
      }
    });
  });
  logger.info('Weather Data persisted.');
}

module.exports = downloadWeather;
