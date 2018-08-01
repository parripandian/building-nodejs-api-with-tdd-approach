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

    describe('fetchCustomerById', function () {
        var expectedFetchedCustomer, customerId, expectedError;

        it('should successfully fetch the customer by id', function () {
            expectedFetchedCustomer = CustomerFixture.createdCustomer;
            customerId = expectedFetchedCustomer._id;

            CustomerModelMock.expects('findById')
                .withArgs(customerId)
                .chain('exec')
                .resolves(expectedFetchedCustomer);

            return CustomerService.fetchCustomerById(customerId)
                .then(function (data) {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedFetchedCustomer);
                });
        });

        it('should throw error while fetching all customers', function () {
            customerId = CustomerFixture.createdCustomer._id;
            expectedError = ErrorFixture.unknownError;

            CustomerModelMock.expects('findById')
                .withArgs(customerId)
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.fetchCustomerById(customerId)
                .catch(function (error) {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });
    });

    describe('updateCustomer', function () {
        var existingCustomer, expectedModifiedCustomer, expectedError;

        it('should successfully update Customer', function () {
            expectedModifiedCustomer = CustomerFixture.modifiedCustomer;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndUpdate')
                .withArgs(existingCustomer._id, existingCustomer, {new: true})
                .chain('exec')
                .resolves(expectedModifiedCustomer);

            return CustomerService.updateCustomer(existingCustomer._id, existingCustomer)
                .then(function (data) {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedModifiedCustomer);
                });
        });

        it('should throw error while updating Customer', function () {
            expectedError = ErrorFixture.unknownError;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndUpdate')
                .withArgs(existingCustomer._id, existingCustomer, {new: true})
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.updateCustomer(existingCustomer._id, existingCustomer)
                .catch(function (error) {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });

    });

    describe('deleteCustomer', function () {
        var existingCustomer, expectedError;

        it('should successfully remove customer', function () {
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndRemove')
                .withArgs(existingCustomer._id)
                .chain('exec')
                .resolves(existingCustomer);

            return CustomerService.deleteCustomer(existingCustomer._id)
                .then(function (data) {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(existingCustomer);
                });
        });

        it('should throw error while removing customer', function () {
            expectedError = ErrorFixture.unknownError;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndRemove')
                .withArgs(existingCustomer._id)
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.deleteCustomer(existingCustomer._id)
                .catch(function (error) {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });

    });


});