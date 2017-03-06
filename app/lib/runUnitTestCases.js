'use strict';

/**
 * Run test cases using tijasmin framework.
 *
 * @description It has dependency on jasmin framework which is used for unit testing in web.
 *
 */

function jasminerun() {
	var tijasmine = require("/tijasmine/tijasmine"),
		reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();
	
	tijasmine.addSpecModules("/specs/jasmineMySpec");
	tijasmine.addReporter(reporter);
	tijasmine.execute();	
}

function run() {
    var behave = require('/behave');

    //require your created specs
    require('/specs/myspec');

    //run:tests
    behave.run();  	
}

/**
 * Custom reporter fuction for ti-mocha
 * 
 * @description Add a special mocha reporter that will time each test run using our microsecond timer.
 * @param {Object} runner
 */

function $Reporter(runner) {
	var started, title, $results = [], failed = false;

	runner.on('suite', function (suite) {
		title = suite.title;
	});

	runner.on('test', function (test) {
		Ti.API.info('!TEST_START: ' + test.title);
		started = new Date().getTime();
	});

	runner.on('pending', function (test) {
		// TODO Spit out something like !TEST_SKIP:  ?
		started = new Date().getTime(); // reset timer. pending/skipped tests basically start and end immediately
	});

	// 'pending' hook for skipped tests? Does 'pending', then immediate 'test end'. No 'test' event

	runner.on('fail', function (test, err) {
		test.err = err;
		failed = true;
	});

	runner.on('test end', function (test) {
		var tdiff = new Date().getTime() - started,
			result = {
				state: test.state || 'skipped',
				duration: tdiff,
				suite: title,
				title: test.title,
				error: test.err // TODO Include the message property on Windows!
			},
			stringified = JSON.stringify(result);

			stringified = stringified.replace(/\\n/g, "\\n")
					   .replace(/\\'/g, "\\'")
					   .replace(/\\"/g, '\\"')
					   .replace(/\\&/g, "\\&")
					   .replace(/\\r/g, "\\r")
					   .replace(/\\t/g, "\\t")
					   .replace(/\\b/g, "\\b")
					   .replace(/\\f/g, "\\f");
			// remove non-printable and other non-valid JSON chars
			stringified = stringified.replace(/[\u0000-\u0019]+/g,'');
		Ti.API.info('!TEST_END: ' + stringified);
		$results.push(result);
	});
};

/**
 * Setup ti-mocha and run unit test cases.
 * @param {Object} callback This function get executed once all test cases execution has been finished.
 */

function mochaRun(callback) {
	require('/ti-mocha/ti-mocha');
	var $results = [], failed = false;

	require('/specs/creatorsSpec');
	require('/specs/config.test');
	require('/specs/data.test');
	require('/specs/device.test');
	require('/specs/navigation.test');
	require('/specs/url.test');
	require('/specs/utils.test');
	require('/specs/xhr.test');

	mocha.setup({ 
	    reporter: 'ti-spec-studio',   // the reporter to use with your tests
	    quiet: false // if true, suppress all console logging
	});
	
	// run the tests
	(callback && mocha.run(callback)) || mocha.run(); // jshint ignore:line
}

exports.run = run;
exports.jasminerun = jasminerun;
exports.mochaRun = mochaRun;