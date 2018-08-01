'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var request = chai.request;

var app = require('../../app');

var Fixtures = require('../fixtures/fixtures');
var CustomerFixture = Fixtures.CustomerFixture;

var baseUri = '/customers';

var testData = {
    existingCustomer: {}
};

describe('CustomerController', function () {

    describe("POST " + baseUri, function () {
        it('should add new customer', function (done) {
            request(app)
                .post(baseUri)
                .send(CustomerFixture.newCustomer)
                .end(function (err, res) {

                    expect(res.status).to.equal(201);
                    expect(res.body).to.not.equal({});
                    expect(res.body._id).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(CustomerFixture.createdCustomer.firstName);

                    done();

                });
        });
    });

    describe("GET " + baseUri, function () {
        it('should get all customers', function (done) {
            request(app)
                .get(baseUri)
                .end(function (err, res) {

                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.not.equal(0);

                    testData.existingCustomer = res.body[0];

                    done();
                });
        });
    });

    describe('GET ' + baseUri + '/:customerId', function () {

        it('should get a customer by id', function (done) {
            request(app)
                .get(baseUri + '/' + testData.existingCustomer._id)
                .end(function (err, res) {

                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body).to.deep.equal(testData.existingCustomer);
                    expect(res.body.firstName).to.equal(testData.existingCustomer.firstName);

                    done();

                });
        });

    });

});