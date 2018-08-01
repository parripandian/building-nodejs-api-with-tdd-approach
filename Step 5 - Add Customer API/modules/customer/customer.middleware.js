(function () {
    'use strict';

    module.exports = {
        addCustomer: addCustomer
    };

    var CustomerService = require('./customer.module')().CustomerService;

    function addCustomer(req, res, next) {

        CustomerService.createCustomer(req.body)
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(error) {
            next(error);
        }

    }

})();
