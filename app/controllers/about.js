// Arguments passed into this controller can be accessed via the `$.args` object directly or:
'use strict';

var args = $.args;
$.lblTitle.setText(args.fullName);

function destroy() {
    args = null;
}

function loadData(e) {
    Ti.App.fireEvent("loadData", {
        comics : args.comics,
        events: args.events,
        stories: args.stories,
        series: args.series
    });
}
