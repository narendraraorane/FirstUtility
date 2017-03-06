var should = require('/ti-mocha/should');

describe('XHR file', function() {
    var xhr = require("/xhr");

    it('Test all existance of all properties and function', function () {
        should(xhr).not.be.undefined;
        should(xhr).be.a.Object;
        should(xhr.call).be.a.Function;
        should(xhr.encodeData).be.a.Function;
    });

    it('Test encodeData function', function () {
        var data = xhr.encodeData({'id': 5}, Alloy.CFG.baseURL + "public/creators");
        should(data).eql('http://gateway.marvel.com/v1/public/creators?id=5');
    });

    it('Test invalid xhr call', function () {
        var reqObj = {
            "action" : "GET",
            "url" : Alloy.CFG.baseURL + "public/creators?limit=5"
        };        
        xhr.call(reqObj,function(resObj) {
            should(resObj).not.be.undefined;
            should(resObj).be.a.Object;
            should(resObj.success).be.a.Boolean;
            should(resObj.success).be.false;
            resObj = JSON.parse(resObj.error);
            should(resObj).be.a.Object;
            should(resObj.code).be.a.String;
            should((resObj.code ===  "MissingParameter")).be.true;
        });
    });

    it('Test valid xhr call', function () {
        var reqObj = {
            "action" : "GET",
            "url" : Alloy.CFG.baseURL + "public/creators?limit=5&apikey=98610c61460c8194f8af2ebdc7365013&hash=eaee2f36742716f42dbd4f5fe2653fbf&ts=1488374267207"
        };        
        xhr.call(reqObj,function(resObj) {
            should(resObj).not.be.undefined;
            should(resObj).be.a.Object;
            should(resObj.success).be.a.Boolean;
            should(resObj.success).be.true;
            resObj = JSON.parse(resObj.data);
            should(resObj.code).be.a.Number;
            should((resObj.code ===  200)).be.true;
            should(resObj.data.results).be.a.Array;
            var len = resObj.data.results.length;
            should(len).be.a.Number;
            should((len <= 5)).be.true;
            
            if(len > 0) {
                should(resObj.data.results[0]).be.Object;
            }
        });
    });

});