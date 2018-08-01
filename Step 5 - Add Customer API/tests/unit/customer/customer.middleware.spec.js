'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var bluebird = require('bluebird');
var Promise = bluebird.Promise;

var CustomerModule = require('../../../modules/customer/customer.module')();
var CustomerMiddleware = CustomerModule.CustomerMiddleware;
var CustomerService = CustomerModule.CustomerService;

var Fixtures = require('../../fixtures/fixtures');
var CustomerFixture = Fixtures.CustomerFixture;
var ErrorFixture = Fixtures.ErrorFixture;

var req, res, next;

describe('CustomerMiddleware', function () {

    beforeEach(function () {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
    });

    describe('addCustomer', function () {
        var createCustomer, createCustomerPromise, expectedCreatedCustomer, expectedError;

        beforeEach(function () {
            createCustomer = sinon.stub(CustomerService, 'createCustomer');
            req.body = CustomerFixture.newCustomer;
        });

        afterEach(function () {
            createCustomer.restore();
        });

        it('should successfully create new customer', function () {
            expectedCreatedCustomer = CustomerFixture.createdCustomer;

            createCustomerPromise = Promise.resolve(expectedCreatedCustomer);
            createCustomer.withArgs(req.body).returns(createCustomerPromise);

            CustomerMiddleware.addCustomer(req, res, next);

            sinon.assert.callCount(createCustomer, 1);

            return createCustomerPromise.then(function () {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCreatedCustomer);
                sinon.assert.callCount(next, 1);
            });

        });

        it('should throw error while creating the new customer', function () {
            expectedError = ErrorFixture.unknownError;

            createCustomerPromise = Promise.reject(expectedError);
            createCustomer.withArgs(req.body).returns(createCustomerPromise);

            CustomerMiddleware.addCustomer(req, res, next);

            sinon.assert.callCount(createCustomer, 1);

            return createCustomerPromise.catch(function (error) {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });

    });

});