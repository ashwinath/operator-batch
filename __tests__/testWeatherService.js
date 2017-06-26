const downloadWeather = require('../Services/WeatherService'),
      _ = require('lodash');
      redis = require('../Redis/RedisSession');

jest.autoMockOff();

afterAll(() => {
  _.range(14).forEach(iterator => {
    redis.del(`Weather:${iterator}`);
  });
  redis.quit();
});

describe('Test the downloading weather api', () => {

  it('will download the weather and check lower bound for persistence', done => {
    downloadWeather(() => {
      redis.HGETALL("Weather:0", (err, results) => {
        expect(results).toBeTruthy();
        done()
      });
    });
  });

  it('will download the weather and check upper bound for persistence', done => {
    downloadWeather(() => {
      redis.HGETALL("Weather:13", (err, results) => {
        expect(results).toBeTruthy();
        done()
      });
    });
  });
});
