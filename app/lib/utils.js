/**
* @class FirstUtility.Library.Utils
* 
* This class contains various utility methods which are helpful for day to day coding.
* 
*/

'use strict';

/**
 * This method check wheather the input string is empty or not.
 * @param {String} str String to check.
 * @param {String} msg Message needs to be shown if above string is empty
 * @param {Object} callback Callback function to call after the above check is complete.
 * @param {Boolean} noTrimFlag Flag to set wheather it should trim string or not.
 * @return {boolean} Return true it it's empty after showing alert message. Return false if it is not empty.
 */
exports.isEmpty = function(str, msg, callback, noTrimFlag) {
	if(typeof str === "string") {
		if (!noTrimFlag) {
			str = str.trim();
		}

		if (str === "") {
			_showAlert(msg, callback);
			return true;
		}
	}
	return false;
};

/**
 * Check whether the input email is valid or not. It checks whether, it contains @ and . or not.
 * @param {String} email Emailid to validate.
 * @return (Boolean) true/false
 */
exports.isValidEmail = function(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
};

/**
 * This method will check if your password is valid or not. It checks strength of password.
 * @param {String} pwd Password to check
 * @param {String} msg Message to show if the password is not valid.
 * @param {Object} callback Callback function to call if password is invalid.
 */
exports.isValidPwd = function(pwd, msg, callback) {
	if(typeof pwd === "string" && pwd.length >= 4) {
		return true;
	}
	_showAlert(msg, callback);
	return false;
};

/**
 * This method will check if your name is valid or not. It checks whether the enter name is string or not.
 * @param {String} name Name to check
 * @param {String} msg Message to show if the name is not valid.
 * @param {Object} callback Callback function to call if name is invalid.
 */
exports.isValidName = function(name, msg, callback) {
	if(typeof name === "string") {
		return true;
	}
	_showAlert(msg, callback);
	return false;
};

/**
 * This function shows an alert.
 * @param {String} msg Message to show on alert box.
 * @param {Object} callback Function to call after user click ok on alert box.
 */
function _showAlert(msg, callback) {
	var alert = Ti.UI.createAlertDialog({
		message : msg
	});
	if(callback) alert.addEventListener("click", callback);
	alert.show();
}

exports.showAlert = _showAlert;

/**
 * This method will check if user is connected with internet or not.
 * @param {String} msg Message to show if user is offline.
 * @return (Boolean) True/False
 */
exports.isOnline = function(msg) {
	if(Ti.Network.online) {
		return true;
	} else {
		msg = msg || L("offline_msg");		
		_showAlert(msg, function() {
			return false;
		});
	}
};

/**
 * This method returns random color hexcode except white (#FFFFFF) or black (#000000)
 * @return {String} Color hexcode.
 */
exports.getRandomColor = function() {
    var color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

    if (color === "#FFFFFF" || color === "#000000") {
        getRandomColor();
    }

    return color;
};
