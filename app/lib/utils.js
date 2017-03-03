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

exports.isValidEmail = function(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
};

exports.isValidPwd = function(pwd, msg, callback) {
	if(typeof pwd === "string" && pwd.length >= 4) {
		return true;
	}
	_showAlert(msg, callback);
	return false;
};

exports.isValidName = function(name, msg, callback) {
	if(typeof name === "string") {
		return true;
	}
	_showAlert(msg, callback);
	return false;
};

function _showAlert(msg, callback) {
	var alert = Ti.UI.createAlertDialog({
		message : msg
	});
	if(callback) alert.addEventListener("click", callback);
	alert.show();
}

exports.showAlert = _showAlert;

exports.isOnline = function(msg) {
	if(Ti.Network.online) {
		return true;
	} else {
		var msg = msg || L("offline_msg");		
		_showAlert(msg, function() {
			return false;
		});
	}
};