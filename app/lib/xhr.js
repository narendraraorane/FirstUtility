'use strict';

exports.call = function(reqObj, _callback) {
	var xhr = Ti.Network.createHTTPClient({
		timeout : Alloy.CFG.wstimeout,
		onload : function(e) {
			Ti.API.info("this.responseText on success ==> " + this.responseText);
			_callback({
				"success" : true,
				"data" : this.responseText, // JSON.parse(this.responseText), // commented for temp purpose 
			});
		},
		onerror : function(e) {
			Ti.API.info("this.responseText on error ==> " + this.responseText);
			_callback({
				"success" : false,
				"error" : JSON.parse(this.responseText)
			});
		}
	});

	var url = reqObj.url || "";
	if (reqObj.action === "GET" && reqObj.inputObj) {
		url = encodeData(reqObj.inputObj, url);
	}
	
	xhr.open(reqObj.action, url);
	
    Ti.API.info(url + " ==> " + JSON.stringify(reqObj.inputObj));
    
	if(reqObj.inputObj && reqObj.action !== "GET") {
		xhr.setRequestHeader("Content-Type", "application/json");	
		xhr.send(JSON.stringify(reqObj.inputObj));
	} else {
		xhr.send();
	}
};

function encodeData(obj, url) {
	var str = [];
	for (var p in obj) {
		str.push(Ti.Network.encodeURIComponent(p) + "=" + Ti.Network.encodeURIComponent(obj[p]));
	}

	if (_.indexOf(url, "?") == -1) {
		return url + "?" + str.join("&");
	} else {
		return url + "&" + str.join("&");
	}
}

exports.encodeData = encodeData;