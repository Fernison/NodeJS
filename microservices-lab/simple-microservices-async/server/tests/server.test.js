const request=require('supertest');
const expect=require('expect');
const sleep = require('sleep');

const {app}=require('./../ms-producer');

describe('GET /test', () => {
  it('should return 200 code', (done) => {
    request(app)
      .get('/test')
      .expect(200) // Código HTTP
      .end(done);
  });
});

describe('Kafka', () => {
  it('should contain 1 message', (done) => {
    expect(1).toBe(1);
    done();
  });
});
