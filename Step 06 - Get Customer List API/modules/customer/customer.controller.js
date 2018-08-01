(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var CustomerMiddleware = require('./customer.module')().CustomerMiddleware;

    router.post('/',
        CustomerMiddleware.addCustomer,
        function (req, res) {
            res.status(201).json(req.response);
        });

    router.get('/',
        CustomerMiddleware.getCustomers,
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();
