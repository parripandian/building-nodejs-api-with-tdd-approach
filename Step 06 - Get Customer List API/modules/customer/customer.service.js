(function () {
    'use strict';

    module.exports = {
        createCustomer: createCustomer,
        fetchCustomers: fetchCustomers
    };

    var CustomerModel = require('./customer.module')().CustomerModel;

    function createCustomer(customer) {
        return CustomerModel.create(customer);
    }

    function fetchCustomers() {
        return CustomerModel.find({})
            .exec();
    }

})();
