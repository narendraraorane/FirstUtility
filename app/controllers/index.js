/*jshint maxcomplexity:false */

/*exported require, destroy, srchCancel, srchCreator, formatOutput */

/**
* This is the main index.js file
* @class Index
* 
* This class contains code to show inital page.
*/

'use strict';

// Arguments passed into this controller can be accessed off of the `$.args` object directly or `arguments[0]`.

/**
 * Importing othere classes which are needed.
 */
var data = require("/data"),
    navManager = require("/navigation"),
    utils = require("/utils"),
    moment = require("alloy/moment");

/**
 * Return string with initial letter in capital format.
 * @return {String} string with initial letter in capital form.
 */
String.prototype.initCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Creating singletone instance of collection to fetch data. 
 */
var creators = Alloy.Collections.instance("creators");
creators.fetch();

/**
 * This is to check if data is present locally or not.
 * If it is present locally, fetch the data from local database(.sqlite).
 * If it is not present then call webservice to get data and store it locally.
 */
if (creators.length !== 0) {
    openWin();
} else {
    init();
}

/**
 * This method act as destructor for this class.
 */

function destroy() {
    data.cleanup();
    $.destroy(); // clean up binding
    data = null, navManager = null, moment = null; // jshint ignore:line
}

/**
 * Hides the keyboard when the cancel button is clicked
 *
 * @param {Object} e Event data passed to the function
 */
function srchCancel(e) {
    $.closeBtn.visible = false;
    $.txtCreatorSearch.value = '';
    $.lstCreators.searchText = '';
    $.txtCreatorSearch.blur();
}

/**
 * Open the view in fullscreen mode along with zoom out animation.
 *
 * @param {Object} Event data passed to the function
 */

function openFullScreen(e) {
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

    var lblAnimate = $.UI.create("Label", {
        left : 25,
        top : (point.y - 30),
        text : e.source.text,
        width : 40,
        height : 40,
        backgroundColor : e.source.parent.backgroundColor || "red",
        classes : ["txtAlignCenter", "colWhite", "font18", "fontBold"]
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

/**
 * This is entry point for program if it doesn't have data present locally.
 */

function init() {
    data.getCharacterData(function() {
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

/**
 * Handles the list item click event
 *
 * @description This will open new controller to see details of selected creator.
 *
 * @param {Object} Event data passed to the function
 */

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
    // Capitalized initial letter.
    transform.iLetter = _.first(transform.firstName.initCaps());
    // Add random background color to initial letter.
    transform.bgcolor = utils.getRandomColor();
    // Relative time in last seen.
    transform.modified = "Last seen - " + moment(transform.modified, [moment.ISO_8601]).fromNow();
    return transform;
}

/**
 * Run test cases only if deployment type is develoment or test.
 */
if (Ti.App.deployType !== "production") {
    require("/runUnitTestCases").mochaRun();
}

/**
 * Open window.
 */
function openWin() {
    if(OS_IOS) {
        var navWindow = $.UI.create("NavigationWindow", {
            window: $.win
        });
        navWindow.open();
        Alloy.Globals.navWindow = navWindow;
    } else {
        $.win.open();
    }

    return;
}

/**
* Pass focus on search textfield.
*/

function focusSrch() {
    $.txtCreatorSearch.focus();
}