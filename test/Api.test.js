const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../server/router/api');

describe('Unit testing the /healthz route', function () {

  it('should return OK status', function () {
    return request(app)
      .get('/healthz')
      .then(function (response) {
        assert.equal(response.status, 200)
      })
  });

});

describe('Unit testing the /movies route', function () {

  it('should return OK status and body length equal 24', function () {
    return request(app)
      .get('/movies')
      .then(function (response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.length, 24)
      })
  });

});
