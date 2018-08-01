(function () {
    'use strict';

    module.exports = {
        createCustomer: createCustomer
    };

    var CustomerModel = require('./customer.module')().CustomerModel;

    function createCustomer(customer) {
        return CustomerModel.create(customer);
    }

})();
