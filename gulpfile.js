 /**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';
var cucumber = require('gulp-cucumber');
var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
var mkdirp = require('mkdirp');
var cucumber_junit2 = require('cucumber-junit');
var htmlReporter = require('gulp-protractor-cucumber-html-report');
var fs = require('fs');
var sauceConnectLauncher = require('sauce-connect-launcher');
var runSequence = require('run-sequence');
var rootDirectory = path.join(__dirname, './');
var commons = require('lt-commons-monitor');
//var googleReport = require('lt-auto-tps-updater');

var config = require('./config');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', function () {
    var color = $.util.colors.green;
    $.util.log('Here are the available tasks:');
    $.util.log(color('    gulp validate --> JSHint your JavaScript files'));
    $.util.log(color('    gulp clean --> Clear the reports directory'));
    $.util.log(color('    gulp dev --> Run automated tests against DEV environment'));
    $.util.log(color('    gulp qa --> Run automated tests against QA environment'));
    $.util.log(color('    gulp dev:remote --> Run automated tests against DEV environment in SauceLabs'));
    $.util.log(color('    gulp qa:remote --> Run automated tests against QA environment in SauceLabs'));
});


// add task to create reports directory (if not already there) and delete the contents
gulp.task('clean', function (cb) {
    del(['reports/**/*'], cb);
});

gulp.task('submit-reports', function (cb) {
    var json = require('./reports/cucumber_report.json');
    googleReport.addResultsWithCucumber('1wVgUCiUHftt29rtZF88S8JcLMmUB7y4aCO-igGB0r5E', 0, json);
    cb();
});

gulp.task('validate', function () {
    return gulp.src('features/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('reports:junit', function (cb) {
    var inputJson = fs.readFileSync(path.join(__dirname, 'reports/cucumber-test-results.json'));
    var xml = cucumber_junit2(inputJson, {
        indent: '    '
    });
    mkdirp('reports/junit');
    fs.writeFile('reports/junit/cucumber_report.xml', xml, cb);
});

gulp.task('reports:html', function () {
    return gulp.src('./reports/cucumber-test-results.json')
        .pipe(htmlReporter({
            dest: 'reports/html/'
        }));
});

/**
 * Orchestration tasks
 */

gulp.task('dev', ['validate'], function (callback) {
    process.env.demo = 'https://jsonplaceholder.typicode.com';
    process.env.libPath = __dirname + '/features/support/lib/';
    process.env.dataPath = __dirname + '/features/support/data/';
    runFiles(done);
});
/**
 * Execution tasks
 */
gulp.task('run:dev', function (done) {
    process.env.NODE_ENV = 'dev';
    process.env.API_URL = config.devApiUrl;
    runFiles(done);
});

gulp.task('version', ()=> {
    return commons.versionApp(rootDirectory);
});

function runFiles(done) {
    gulp.src('features/*')
        .pipe(cucumber({
            'steps': 'features/step_definitions/*_steps.js',
            'support': ['features/support/env.js', 'features/support/cucumberJsonListener.js'],
            'format': 'pretty',
        }))
        .once('error', function (err) {
            console.log('cucumber:customerror error event');
            done();
        })
        .once('end', function () {
            console.log('cucumber:customerror end event');
            done();
        });

}