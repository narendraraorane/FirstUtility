exports.info = function() {
    var displayCaps = Ti.Platform.displayCaps;
    var model = Ti.Platform.model;

    return {
        width : (displayCaps.platformWidth / (displayCaps.dpi / 160)),
        height : (displayCaps.platformHeight * (displayCaps.dpi / 160)),
        manufacturer: Ti.Platform.manufacturer,
        model: model
    };
};
