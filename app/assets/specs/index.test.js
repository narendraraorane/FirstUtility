var should = require('/ti-mocha/should');

describe('Index file: ', function() {
    var index = Alloy.createController("index");
    var win = index.getView();

    it('Test all existance of all properties and function', function () {
        should(index).not.be.undefined;
        should(index).be.a.Object;
        should(index.getView).be.a.Function;
        should.exist(win);
        win.id.should.equal('win');
    });
});