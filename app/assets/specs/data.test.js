var should = require('/ti-mocha/should');

describe('Data file', function() {
    var data = require("/data");

    it('Test all existance of all properties and function', function () {
        should(data).not.be.undefined;
        should(data).be.a.Object;

        should(data.getCharacterData).not.be.undefined;
        should(data.getCharacterData).be.a.Function;
    });
});