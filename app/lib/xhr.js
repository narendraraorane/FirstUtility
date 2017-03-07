/**
* @class FirstUtility.Library.XHR
* 
* This class contains method to create instance of `Ti.Network.HTTPClient` to call webservice.
* 
*/

'use strict';

/**
 * This method will call REST API and passon input parameter to REST.
 * @param {Object} reqObj Request obejct which has all infor about which url to hit, which input parameters to pass, action of webservice.
 * @param {Object} _callback Functon get's called on successful/unsuccessful execution.
 */
exports.call = function(reqObj, _callback) {
	var xhr = Ti.Network.createHTTPClient({
		timeout : Alloy.CFG.wstimeout,
		onload : function(e) {
			_callback({
				"success" : true,
				"data" : this.responseText, // JSON.parse(this.responseText), // commented for temp purpose 
			});
		},
		onerror : function(e) {
			_callback({
				"success" : false,
				"error" : this.responseText
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

/**
 * Encode data so that it is compatible for webservice call. Espcially for GET request to send query parameters.
 * @param {Object} obj Objects to encode
 * @param {String} url Url after which you want to encode data.
 * @rertun {String} Encode url string.
 */
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