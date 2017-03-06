'use strict';

exports.openWin = function(win) {
    if(OS_IOS) {
        Alloy.Globals.navWindow.openWindow(win);
    } else {
        win.open();
    }
};

exports.close = function(win) {
    if(OS_IOS) {
        Alloy.Globals.navWindow.closeWindow(win);
    } else {
        win.close();
    }
};
