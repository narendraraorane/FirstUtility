'use strict';

exports.info = function() {
    var displayCaps = Ti.Platform.displayCaps;

    return {
        width : (displayCaps.platformWidth / (displayCaps.dpi / 160)),
        height : (displayCaps.platformHeight * (displayCaps.dpi / 160)),
        manufacturer: Ti.Platform.manufacturer,
        model: Ti.Platform.model
    };
};
