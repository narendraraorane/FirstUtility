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
        var data = encodeData({'id': 5}, Alloy.CFG.baseURL + "public/creators");
        // TODO Open a JIRA ticket for parity! iOS encodes exclamation points, Windows/Android do not
        if (OS_IOS) {
            data.should.eql('http://gateway.marvel.com/v1/public/creators?id=5');
        } else {
            data.should.eql('Look%20what%20I%20found!%20I%20like%20this%3A');
        }
    });

    it('Test invalid xhr call', function () {
        var reqObj = {
            "action" : "GET",
            "url" : Alloy.CFG.baseURL
        };        
        xhr.call(reqObj,function(resObj) {
            should(resObj).not.be.undefined;
            should(resObj).be.a.String;
            resObj = JSON.parse(resObj);
            should(resObj).be.a.Object;
            should(resObj.code).be.a.Number;
            should((resObj.code ===  403)).be.true;
        })
    });

    it('Test valid xhr call', function () {
        var reqObj = {
            "action" : "GET",
            "url" : url.getCharacterURL(5)
        };        
        xhr.call(reqObj,function(resObj) {
            should(resObj).not.be.undefined;
            should(resObj).be.a.String;
            resObj = JSON.parse(resObj);
            should(resObj).be.a.Object;
            should(resObj.code).be.a.Number;
            should((resObj.code ===  200)).be.true;
            should(resObj.data.results).be.a.Array;
            
            var len = resObj.data.results.length;
            should(len).be.a.Number;
            should((len <= 5)).be.true;
            
            if(len > 0) {
                should(resObj.data.results[0]).be.Object;
            }
        })
    });

});