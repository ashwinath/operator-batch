const downloadWeather = require('../Services/WeatherService'),
      _ = require('lodash'),
      redis = require('../Redis/RedisSession');

jest.autoMockOff();

afterAll(() => {
  redis.quit();
});

describe('Test downloading weather api', () => {

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
