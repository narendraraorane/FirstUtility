var should = require('/ti-mocha/should');

describe('Config file', function() {

    it('Test all existance of all properties and function', function() {
        should.exist(Alloy.CFG.wstimeout);
        should.exist(Alloy.CFG.baseURL);
        should.exist(Alloy.CFG.apiKey);
        should.exist(Alloy.CFG.hash);
        should.exist(Alloy.CFG.timestamp);
    });

    it('All config should have approprirate data type', function() {
        should(Alloy.CFG.wstimeout).be.a.Number;
        should(Alloy.CFG.baseURL).be.a.String;
        should(Alloy.CFG.apiKey).be.a.String;
        should(Alloy.CFG.hash).be.a.String;
        should(Alloy.CFG.timestamp).be.a.String;
    });

    it('Check api key', function() {
        should(Alloy.CFG.apiKey).be.eql("98610c61460c8194f8af2ebdc7365013");
    });

    it('Check base url', function() {
        should(Alloy.CFG.baseURL).be.eql("http://gateway.marvel.com/v1/");
    });

    it('Check md5 hash', function() {
        var md5Hash = Ti.Utils.md5HexDigest(Alloy.CFG.timestamp + "" + Alloy.CFG.apiKey);
        should(Alloy.CFG.hash).be.eql(md5Hash);
    });
});