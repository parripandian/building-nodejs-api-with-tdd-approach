var chai = require('chai');
var expect = chai.expect;

var MongoDBUtil = require('../../../modules/mongodb/mongodb.module').MongoDBUtil;

describe('MongoDBUtil', function () {

    describe('mongodb.util file', function () {

        it('should read the mongodb.util file', function () {
            expect(MongoDBUtil).to.be.a('object');
        });

        it('should confirm init function exist', function () {
            expect(MongoDBUtil.init).to.be.a('function');
        });

    });

});
