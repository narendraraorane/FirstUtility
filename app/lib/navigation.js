/**
* @class FirstUtility.Library.Navigation
* 
* This class contains methods which is helpful in navigating from one window to other window as per OS nature.
*/

'use strict';

/**
 * This method open window in navigation window for ios and normal window in android.
 * @param {Object} win Instance of `Ti.UI.Window` to open. 
 */
exports.openWin = function(win) {
    if(OS_IOS) {
        Alloy.Globals.navWindow.openWindow(win);
    } else {
        win.open();
    }
};

/**
 * This method close window in navigation window for ios and normal window in android.
 * @param {Object} win Instance of `Ti.UI.Window` to close.
 */
exports.close = function(win) {
    if(OS_IOS) {
        Alloy.Globals.navWindow.closeWindow(win);
    } else {
        win.close();
    }
};
