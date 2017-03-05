var should = require('/ti-mocha/should');

describe('Navigation file', function() {
    var navManager = require("/navigation");

    it('Test all existance of all properties and function', function () {
        should(navManager).not.be.undefined;
        should(navManager).be.a.Object;

        should(navManager.openWin).not.be.undefined;
        should(navManager.openWin).be.a.Function;

        should(navManager.close).not.be.undefined;
        should(navManager.close).be.a.Function;
    });
});