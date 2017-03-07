/**
* @class FirstUtility.Library.Device
* 
* This class contains object which has all relevant info about device on which you app is currently running.
* Like it's width, height, model, manufacturer etc.
*/

'use strict';

/**
 * This method return on object which has all relevant info about device.
 * @return {Object} This object contain info about device width, height, manufacturer, model.
 */
exports.info = function() {
    var displayCaps = Ti.Platform.displayCaps;

    return {
        width : (displayCaps.platformWidth / (displayCaps.dpi / 160)),
        height : (displayCaps.platformHeight * (displayCaps.dpi / 160)),
        manufacturer: Ti.Platform.manufacturer,
        model: Ti.Platform.model
    };
};
