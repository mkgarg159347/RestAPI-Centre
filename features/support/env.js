'use strict';

/**
 * This file is used for setting up environment properties
 */
var apiRequests = require(`${process.env.libPath}requestFunction`),
    // sqlConnectionHolder = require(`${process.env.libPath}sqlConnectionHolder`),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');
var env = function () {
    chai.use(chaiAsPromised);
    // global functions setup
    global.expect = chai.expect;
    global.assert = require('assert');
    global.fs = require('fs');
    global.apiRequests = new apiRequests();
    // global.sqlRequests = new sqlConnectionHolder();

    // default timeout setup
    this.setDefaultTimeout(60 * 1000 * 2);
};

module.exports = env;

// testing visioning again 