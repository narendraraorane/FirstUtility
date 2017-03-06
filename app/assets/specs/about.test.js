var should = require('/ti-mocha/should');

describe('About file: ', function() {
    var about = Alloy.createController("about");
    var win = about.getView();

    it('Test all existance of all properties and function', function () {
        should(about).not.be.undefined;
        should(about).be.a.Object;
        should(about.getView).be.a.Function;
        should.exist(win);
        win.id.should.equal('about');
    });
});