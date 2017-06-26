const downloadNews = require('../Services/NewsServices'),
      redis = require('../Redis/RedisSession'),
      NewsContract = require('../Contracts/NewsContract');

jest.autoMockOff();

afterAll(() => {
  redis.del('News:bbc-news');
  redis.del(`News:bbc-news:${NewsContract.COUNTER}`);
  redis.quit();
});

describe('Test downloading weather api', () => {

  it('will download bbc-news', done => {
    downloadNews('bbc-news', () => {
      getCounter('bbc-news', (err, response) => {
        redis.HGETALL(`News:bbc-news:${response - 1}`,
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
  });

});

function getCounter(source, callback) {
  redis.GET(`News:${source}:${NewsContract.COUNTER}`, callback);
}
