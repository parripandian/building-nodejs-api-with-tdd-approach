(function () {
    'use strict';

    module.exports = {
        createCustomer: createCustomer,
        fetchCustomers: fetchCustomers,
        fetchCustomerById: fetchCustomerById,
        updateCustomer: updateCustomer,
        deleteCustomer: deleteCustomer
    };

    var CustomerModel = require('./customer.module')().CustomerModel;

    function createCustomer(customer) {
        return CustomerModel.create(customer);
    }

    function fetchCustomers() {
        return CustomerModel.find({})
            .exec();
    }

    function fetchCustomerById(customerId) {
        return CustomerModel.findById(customerId)
            .exec();
    }

    function updateCustomer(customerId, customer) {
        return CustomerModel
            .findByIdAndUpdate(customerId, customer, {new: true})
            .exec();
    }

    function deleteCustomer(customerId) {
        return CustomerModel
            .findByIdAndRemove(customerId)
            .exec();
    }


})();
