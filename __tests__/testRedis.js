const redis = require('../Redis/RedisSession');

afterAll(() => {
  redis.quit();
});

describe('Redis', () => {

  it('will test if key "lul" has the value of "cat"', done => {
    redis.set("lul", "cat", (err, reply) => {
      redis.get("lul", (err, reply) => {
        expect(reply).toBe("cat");
        done();
      });
    });
  });

  it('will test an undefined key will return a falsy value', done => {
    redis.get("ayylmao", (err, reply) => {
      expect(reply).toBeFalsy();
      done();
    });
  });
})
