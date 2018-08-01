(function () {
    'use strict';

    module.exports = {
        createCustomer: createCustomer,
        fetchCustomers: fetchCustomers,
        fetchCustomerById: fetchCustomerById
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

})();
