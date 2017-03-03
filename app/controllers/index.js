var data = require("/data"), navManager = require("/navigation"), moment = require("alloy/moment");
var creators = Alloy.Collections.instance("creators");

String.prototype.initCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

creators.fetch();
Ti.API.info('length == ' + creators.length);

if(creators.length !== 0) {
    $.index.open();
} else {
    init();
}

if(OS_IOS) {
    Alloy.Globals.navWindow = $.index;
}

/**
 * 
 */

function cleanup() {
    data.cleanup();
}

function init() {    
    data.getCharacterData(function() {
        Ti.API.info('callback function called!');
        lazyLoad();
    });
};

function lazyLoad() {
    creators.fetch();
    $.index.open();
}

function selectCreator(e) {
    var row = $.lstCreators.sections[e.sectionIndex].getItemAt(e.itemIndex);
    
    if(row.properties.height === 70) {
        row.properties.height = 300;
    } else {
        row.properties.height = 70;
    }
    
    $.lstCreators.sections[e.sectionIndex].updateItemAt(e.itemIndex, row, { animated:true });
}

function formatOutput(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    //Ti.API.info("transform ==> " + JSON.stringify(transform));
    transform.iLetter = _.first(transform.firstName.initCaps());
    transform.bgcolor = getRandomColor();
    transform.modified = moment(transform.modified, [moment.ISO_8601]).fromNow();
    return transform;
}

function getRandomColor() {
    var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    //Ti.API.info('color ==> ' + color);
    
    if(color === "#FFFFFF" || color === "#000000") {
        getRandomColor();
    }
    
    return color;
};

$.getRandomColor = getRandomColor;