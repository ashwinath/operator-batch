const downloadNews = require('../Services/NewsServices'),
      redis = require('../Redis/RedisSession'),
      NewsContract = require('../Contracts/NewsContract');

jest.autoMockOff();

afterAll(() => {
  redis.quit();
});

describe('Test downloading news api', () => {

  it('will download BBC News', done => {
    testNewsDownload(NewsContract.BBC, done);
  });

  it('will download TECHCRUNCH News', done => {
    testNewsDownload(NewsContract.TECHCRUNCH, done);
  });

  it('will download BLOOMBERG News', done => {
    testNewsDownload(NewsContract.BLOOMBERG, done);
  });

  it('will download BUSINESS_INSIDER News', done => {
    testNewsDownload(NewsContract.BUSINESS_INSIDER, done);
  });

  it('will download REUTERS News', done => {
    testNewsDownload(NewsContract.REUTERS, done);
  });

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
