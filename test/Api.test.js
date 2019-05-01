const assert = require('assert');
const should = require('chai').should;
const request = require('supertest');
const app = require('../server/router/api');
const jsonServer = require('json-server');
let restServer = null;


before(function () {
  const jsonApp = jsonServer.create();
  const router = jsonServer.router('../database.json');
  jsonApp.use(router);
  restServer = jsonApp.listen(5000);

});


describe('Unit testing the /healthz route', function () {

  it('should return OK status', function () {
    return request(app)
      .get('/healthz')
      .then(function (response) {
        assert.equal(response.status, 200);
      })
  });

});

describe('Unit testing the /movies route', function () {

  it('should return OK status and body length equal 24', async function () {
    const response = await request(app).get('/movies');
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 24);

  });
});

after(function () {
  restServer.close();
})
