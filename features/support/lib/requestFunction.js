'use strict';
var Client = require('node-rest-client').Client;
var fetch = require('node-fetch');

var apiRequests = function () {
    var client = new Client();

    this.postMethodForMultipart = function (endPoint_URL, resource, requestBody, callback) {

        //Concat EndPoint_URL and resource

        endPoint_URL = endPoint_URL + resource;

        fetch(endPoint_URL, {method: 'POST', body: requestBody, timeout: 30000}).then(function (response) {
            callback(response);
        });

    };

    this.requester = function (type, endpointUrl, resource, request, callback) {
        endpointUrl = endpointUrl + resource;
        var args = {
            data: request.requestBody,
            path: request.requestParam,

            //Header information
            headers: request.headers,

            // request and response additional configuration
            requestConfig: {
                timeout: 100000, //request timeout in milliseconds
                noDelay: true, //Enable/disable the Nagle algorithm
                keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
                keepAliveDelay: 100000 //and optionally set the initial delay before the first keepalive probe is sent
            },
            responseConfig: {
                timeout: 100000 //response timeout
            }

        };
        var req = client[type](endpointUrl, args, function (responseBody, responseHeaders) {
            return callback(responseBody, responseHeaders);
        });

        req.on('requestTimeout', function (req) {
            console.log('request has expired' + req);

        });

        req.on('responseTimeout', function (res) {
            console.log('response has expired' + res);

        });
        //it's useful to handle request errors to avoid, for example, socket hang up errors on request timeouts
        req.on('error', function (err) {
            console.log('request error', err);
        });

    };

};

module.exports = apiRequests;