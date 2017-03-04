/*jshint maxcomplexity:false */

/*exported require, destroy, srchCancel, srchCreator, formatOutput */

"use strict";

// Arguments passed into this controller can be accessed off of the `$.args` object directly or `arguments[0]`.
var data = require("/data"),
    navManager = require("/navigation"),
    moment = require("alloy/moment");
var creators = Alloy.Collections.instance("creators");

String.prototype.initCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

creators.fetch();
Ti.API.info('length == ' + creators.length);

$.txtCreatorSearch.focus();

if (creators.length !== 0) {
    openWin();
} else {
    init();
}

if (OS_IOS) {
    Alloy.Globals.navWindow = $.index;
}

/**
 *
 */

function destroy() {
    data.cleanup();
    // clean up binding
    $.destroy();
    data = null,
    navManager = null,
    moment = null;
}

/**
 * Hides the keyboard when the cancel button is clicked
 *
 * @param {Object} Event data passed to the function
 */
function srchCancel(e) {
    $.closeBtn.visible = false;
    $.txtCreatorSearch.value = '';
    $.lstCreators.searchText = '';
    $.txtCreatorSearch.blur();
}

function openFullScreen(e) {
    Ti.API.info('e ==> ' + JSON.stringify(e));

    var scaleUp = Ti.UI.createAnimation({
        top : 0,
        left : 0,
        width : (OS_IOS) ? Ti.UI.FILL : Alloy.Globals.device.width,
        height : (OS_IOS) ? Ti.UI.FILL : Alloy.Globals.device.height,
        duration : 1000
    });

    // converting the position
    var point = e.source.convertPointToView({
        x : e.x,
        y : e.y
    }, $.win);
    Ti.API.info("point ==> " + point.x + " " + point.y);

    var lblAnimate = $.UI.create("Label", {
        left : 25,
        top : (point.y - 30),
        text : e.source.text,
        width : 40,
        height : 40,
        backgroundColor : e.source.parent.backgroundColor || "red",
        classes : ["txtAlignCenter", "colWhite"]
    });
    lblAnimate.addEventListener("click", function(e) {
        var scaleDown = Ti.UI.createAnimation({
            left : 25,
            top : (point.y - 20),
            width : 40,
            height : 40,
            duration : 1000
        });
        e.source.animate(scaleDown, function() {
            $.win.remove(e.source);
        });
    });
    $.win.add(lblAnimate);
    lblAnimate.animate(scaleUp, function() {
        lblAnimate.applyProperties({
            top : 0,
            left : 0,
            width : Ti.UI.FILL,
            height : Ti.UI.FILL
        });
    });
}

function init() {
    data.getCharacterData(function() {
        Ti.API.info('callback function called!');
        lazyLoad();
    });
}

/**
 * Handles the SearchBar OnChange event
 *
 * @description On iOS we want the search bar to always be on top, so we use the onchange event to tie it back
 *              to the ListView
 *
 * @param {Object} Event data passed to the function
 */
function srchCreator(e) {
    if (e.source.value !== '') {
        $.closeBtn.visible = true;
    } else {
        $.closeBtn.visible = false;
    }

    $.lstCreators.searchText = e.source.value;
}

function selectCreator(e) {
    var row = $.lstCreators.sections[e.sectionIndex].getItemAt(e.itemIndex);
    row.properties.backgroundColor = "#FFF";
    row.properties.selectedColor = "#FFF";
    $.lstCreators.sections[e.sectionIndex].updateItemAt(e.itemIndex, row);
}

function lazyLoad() {
    creators.fetch();
    openWin();
}

function formatOutput(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    //Ti.API.info("transform ==> " + JSON.stringify(transform));

    // Capitalized initial letter.
    transform.iLetter = _.first(transform.firstName.initCaps());
    // Add random background color to initial letter.
    transform.bgcolor = getRandomColor();
    // Relative time in last seen.
    transform.modified = "Last seen - " + moment(transform.modified, [moment.ISO_8601]).fromNow();
    return transform;
}

function getRandomColor() {
    var color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    //Ti.API.info('color ==> ' + color);

    if (color === "#FFFFFF" || color === "#000000") {
        getRandomColor();
    }

    return color;
}

if (Ti.App.deployType !== "production") {
    //require("/runUnitTestCases").mochaRun();
}

exports.getRandomColor = getRandomColor;

function openWin() {
    (OS_IOS) ? $.index.open() : $.win.open();
    return;
}
