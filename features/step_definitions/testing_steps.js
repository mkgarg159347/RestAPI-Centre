'use strict';
var request = require('../support/lib/requestFunction.js');
var testData = require('../support/data/testData.json');
var res = require('../support/data/resourceData.json');
var Prelab_DeleteAPIs = function () {

    var apiRequests = new request();
    var self = this;

    this.When(/^User sends a '(.+)' request get all the posts$/, function (operation, callback) {
        apiRequests.requester(operation, process.env.demo, res.post, testData.GetAllData, function (responseBody, responseHeader) {
            expect(responseBody).to.not.be.equal(undefined);
            self.responseHeader = responseHeader;
            callback();
        });
    });

    this.Then(/^Status code for get request is (\d+)$/, function (arg1) {
       return expect(self.responseHeader).to.have.property('statusCode', parseInt(arg1));
    });

    this.When(/^User sends a '(.+)' request with user Id to get particular record$/, function (operation, callback) {
        apiRequests.requester(operation, process.env.demo, res.postWithId, testData.GetDataOnparam, function (responseBody, responseHeader) {
            expect(responseBody).to.not.be.equal(undefined);
            self.responseBody = responseBody;
            self.responseHeader = responseHeader;
            callback();
        });
    });

    this.Then(/^The title value is '(.+)'$/, function (titleValue) {
        return expect(self.responseBody).to.have.property('title', titleValue);
    });

    this.When(/^User sends a '(.+)' request for XML API$/, function (operation, callback) {
        apiRequests.requester(operation, process.env.XMLdemo, res.xmlDemo, testData.xmlDemo, function (responseBody, responseHeader) {
            // console.log(responseBody);
            // expect(responseBody).to.not.be.equal(undefined);
            self.responseBody = responseBody;
            self.responseHeader = responseHeader;
            callback();
        });
    });
};

module.exports = Prelab_DeleteAPIs;