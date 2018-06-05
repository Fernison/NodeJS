const request=require('supertest');
const expect=require('expect');

const {app}=require('./../server');

describe('GET /test', () => {
  it('should return 200 code', (done) => {
    request(app)
      .get('/test')
      .expect(200) // Código HTTP
      .end(done);
  });
});
