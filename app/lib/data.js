'use strict';

var utils = require("/utils"),
    xhr = require("/xhr"),
    url = require("/url");

exports.getCharacterData = function(callback) {
    Ti.API.info('getCharacterData');
    var reqObj = {
        "action" : "GET",
        "url" : url.getCharacterURL(100)
    };

    xhr.call(reqObj, function(resObj) {
        resObj = JSON.parse(resObj.data);
        if (resObj.code !== 200) {
            utils.showAlert(L("serverError"));
        } else {
            _.each(resObj.data.results, function(element, index, list) {
                var data = {
                    "id" : element.id,
                    "firstName" : element.firstName,
                    "middleName" : element.middleName,
                    "lastName" : element.lastName,
                    "suffix": element.suffix,
                    "fullName" : element.fullName,
                    "modified": element.modified,
                    "thumbnail" : element.thumbnail.path,
                    "resourceURI" : element.resourceURI,
                    "comics" : element.comics.available,
                    "series" : element.series.available,
                    "stories" : element.stories.available,
                    "events" : element.events.available,
                    "about" : element.urls.url
                };
                var creators = Alloy.createModel("creators", data);
                if(creators.isValid()) {
                    creators.save();
                } else {
                    creators.destroy();
                }
            });
            resObj = null;
            callback();
        }
    });
};

exports.cleanup = function() {
    xhr = null;
    utils = null;
    url = null;
};
