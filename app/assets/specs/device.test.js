var should = require('/ti-mocha/should');

describe('Navigation file', function() {
    var device = require("/device");

    it('Test all existance of all properties and function', function () {
        should(device).not.be.undefined;
        should(device).be.a.Object;

        should(device.info).not.be.undefined;
        should(device.info).be.a.Function;

        var obj = device.info();

        should(obj).not.be.undefined;
        should(obj).be.a.Object;
		should(obj.width).be.a.Number;
		should(obj.height).be.a.Number;
		should(obj.manufacturer).be.a.String;
		should(obj.model).be.a.String;
    });
});