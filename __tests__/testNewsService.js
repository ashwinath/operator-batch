const downloadNews = require('../Services/NewsServices'),
      redis = require('../Redis/RedisSession'),
      JobConfig = require('../Config/JobConfig'),
      NewsContract = require('../Contracts/NewsContract');

jest.autoMockOff();

afterAll(() => {
  redis.quit();
});

describe('Test downloading news api', () => {

  JobConfig.news.source.forEach(source => {
    it(`will download the news from ${source}`, done => {
      testNewsDownload(source, done);
    });
  })

});

function testNewsDownload(source, done) {
  downloadNews(source, () => {
    getCounter(source, (err, response) => {
      redis.HGETALL(`News:${source}:${response - 1}`,
        (err, response) => {
        expect(response).toBeTruthy();
        expect(response[NewsContract.AUTHOR]).toBeTruthy();
        expect(response[NewsContract.TITLE]).toBeTruthy();
        expect(response[NewsContract.DESC]).toBeTruthy();
        expect(response[NewsContract.URL]).toBeTruthy();
        expect(response[NewsContract.URL_TO_IMG]).toBeTruthy();
        expect(response[NewsContract.PUBLISH_DATE]).toBeTruthy();
        done();
      });
    });
  });
}

function getCounter(source, callback) {
  redis.GET(`News:${source}:${NewsContract.COUNTER}`, callback);
}
