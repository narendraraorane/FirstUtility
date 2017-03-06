var should = require('/ti-mocha/should');

describe('URL file: ', function() {
    var url = require("/url");

    it('Test all existance of all properties and function', function () {
        should(url).not.be.undefined;
        should(url).be.a.Object;
        should(url.getCharacterURL).not.be.undefined;
        should(url.getCharacterURL).be.a.Function;
    });

    it('Test getCharacterURL function', function () {
        var _url = 'http://gateway.marvel.com/v1/public/creators?limit=5&apikey=98610c61460c8194f8af2ebdc7365013&hash=eaee2f36742716f42dbd4f5fe2653fbf&ts=1488374267207';
        var api = url.getCharacterURL(5);
        should(api).be.a.String;
        should(api === _url).be.true;

        _url = "http://gateway.marvel.com/v1/public/creators?limit=-5&apikey=98610c61460c8194f8af2ebdc7365013&hash=eaee2f36742716f42dbd4f5fe2653fbf&ts=1488374267207";
        api = url.getCharacterURL(-5);
        should(api).be.a.String;
        should(api === _url).be.true;

        _url = "http://gateway.marvel.com/v1/public/creators?limit=0&apikey=98610c61460c8194f8af2ebdc7365013&hash=eaee2f36742716f42dbd4f5fe2653fbf&ts=1488374267207";
        api = url.getCharacterURL(0);
        should(api).be.a.String;
        should(api === _url).be.true;

        _url = "http://gateway.marvel.com/v1/public/creators?limit=undefined&apikey=98610c61460c8194f8af2ebdc7365013&hash=eaee2f36742716f42dbd4f5fe2653fbf&ts=1488374267207";
        api = url.getCharacterURL();
        should(api).be.a.String;
        should(api === _url).be.true;
    });
});