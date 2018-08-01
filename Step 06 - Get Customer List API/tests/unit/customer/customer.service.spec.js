'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');

var mongoose = require('mongoose');

var CustomerModule = require('../../../modules/customer/customer.module')();
var CustomerModel = CustomerModule.CustomerModel;
var CustomerService = CustomerModule.CustomerService;

var Fixtures = require('../../fixtures/fixtures');
var CustomerFixture = Fixtures.CustomerFixture;
var ErrorFixture = Fixtures.ErrorFixture;

var CustomerModelMock;

describe('CustomerService', function () {

    beforeEach(function () {
        CustomerModelMock = sinon.mock(CustomerModel);
    });

    afterEach(function () {
        CustomerModelMock.restore();

        mongoose.models = {};
        mongoose.modelSchemas = {};

        return mongoose.connection.close();
    });

    describe('createCustomer', function () {
        var newCustomer, expectedCreatedCustomer, expectedError;

        it('should successfully create new customer', function () {
            newCustomer = CustomerFixture.newCustomer;
            expectedCreatedCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('create')
                .withArgs(newCustomer)
                .resolves(expectedCreatedCustomer);

            return CustomerService.createCustomer(newCustomer)
                .then(function (data) {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedCreatedCustomer);
                });
        });

        it('should throw error while creating customer', function () {
            expectedError = ErrorFixture.unknownError;
            newCustomer = CustomerFixture.newCustomer;

            CustomerModelMock.expects('create')
                .withArgs(newCustomer)
                .rejects(expectedError);

            return CustomerService.createCustomer(newCustomer)
                .catch(function (error) {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });

    });

    describe('fetchCustomers', function () {
        var expectedCustomers, expectedError;

        it('should successfully fetch all customers', function () {
            expectedCustomers = CustomerFixture.customers;

            CustomerModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .resolves(expectedCustomers);

            return CustomerService.fetchCustomers()
                .then(function (data) {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedCustomers);
                });

        });

        it('should throw error while fetching all customers', function () {
            expectedError = ErrorFixture.unknownError;

            CustomerModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.fetchCustomers()
                .catch(function (error) {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });
    });

});