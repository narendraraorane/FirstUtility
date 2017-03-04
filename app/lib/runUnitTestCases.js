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

function mochaRun(callback) {
	require('/ti-mocha/ti-mocha');
	require('/specs/creatorSpec')();

	mocha.setup({ 
	    reporter: 'ti-spec-studio',   // the reporter to use with your tests
	    quiet: false             // if true, suppress all console logging
	});
	
	// run the tests
	(callback && mocha.run(callback)) || mocha.run(); 
}

exports.run = run;
exports.jasminerun = jasminerun;
exports.mochaRun = mochaRun;