exports.openWin = function(win) {
    if(OS_IOS) {
        Alloy.Globals.navWindow.open(win);
    } else {
        win.open();
    }
};

exports.close = function(win) {
    if(OS_IOS) {
        Alloy.Globals.navWindow.close(win);
    } else {
        win.close();
    }
};
