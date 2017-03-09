'use strict';


////////////////////////////
// Objects
////////////////////////////

/**
 * This file is used for setting up before/after hooks related to features
 */

module.exports = function () {

    /**
     * this code will be run before the first feature
     */
    this.registerHandler('BeforeFeatures', function (event, callback) {
        console.log('===Performing BeforeFeatures');

        callback();
    });

    /**
     * this code will be run before each feature
     */
    // this.registerHandler('BeforeFeature', function (event, callback) {

    // console.log('===Performing BeforeFeature');

    // to reset variables
    // self.World = world;
    // callback();

    // });

    /**
     * this code will be run after the last feature
     */
    this.registerHandler('AfterFeatures', function (event, callback) {
        console.log('===Performing AfterFeatures');
        callback();
    });
};
