// Arguments passed into this controller can be accessed via the `$.args` object directly or:

/**
* This is the about.js file.
* @class FirstUtility.About
* 
* This class contains code to show hight chart report page.
*/

'use strict';

/**
 * This property contain data about user comics, stories, events and series info.
 */
var args = $.args;

/*
 * Settting title for window.
 */
$.lblTitle.setText(args.fullName);

/**
 * This will clear all the resources hold by this window.
 * Getting called on close of current window. 
 */

function destroy() {
    args = null;
}

/**
 * This function will send data to html page in order to generate hight chart report.
 * @param {Object} e This object content event data which has clicked.
 */
function loadData(e) {
    // Sending data to html page through Ti.App.fireEvent.
    Ti.App.fireEvent("loadData", {
        comics : args.comics,
        events: args.events,
        stories: args.stories,
        series: args.series
    });
}
