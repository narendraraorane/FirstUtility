var should = require('/ti-mocha/should');

describe('Utils file', function() {
    var utils = require("/utils");

    it('Test all existance of all properties and function', function () {
        should(utils).not.be.undefined;
        should(utils).be.a.Object;

        should(utils.getRandomColor).not.be.undefined;
        should(utils.getRandomColor).be.a.Function;

        should(utils.isEmpty).not.be.undefined;
        should(utils.isEmpty).be.a.Function;

        should(utils.isValidEmail).not.be.undefined;
        should(utils.isValidEmail).be.a.Function;

        should(utils.isValidPwd).not.be.undefined;
        should(utils.isValidPwd).be.a.Function;

        should(utils.isValidName).not.be.undefined;
        should(utils.isValidName).be.a.Function;
    });

    it('Test getRandomColor function', function () {
        var color = utils.getRandomColor();
        var nColor = utils.getRandomColor();
        should(color).not.be.undefined;
        should(color).be.a.String;
        should( color !== "#FFFFFF").be.true;
        should( color !== "#000000").be.true;
        should( color !== nColor).be.true;
    });

    it('Test isEmpty function', function () {
        var s = utils.isEmpty(" First Utility ", "Non-empty", undefined, false);
        should(s).not.be.undefined;
        should(s).be.a.Boolean;
        should(s).be.false;
    });

    it('Test isValidEmail function', function () {
        var validEmail = "narendra.raorane@yahoo.co.in";
        var invalidEmail = "narendraraorane@yahoo";

        should(utils.isValidEmail(validEmail)).be.a.Boolean;
        should(utils.isValidEmail(validEmail)).be.true;

        should(utils.isValidEmail(invalidEmail)).be.a.Boolean;
        should(utils.isValidEmail(invalidEmail)).be.false;

    });

    it('Test isValidPwd function', function () {
        should(utils.isValidPwd("Narendra")).be.true;
    });

});