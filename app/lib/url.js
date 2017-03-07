/**
* @class FirstUtility.Library.URL
* 
* This class contains methods which return valid urls to hit in order to get respective data.
* 
*/

'use strict';

/**
 * This method return url to get Marvel creators.
 * @param {Number} limit To get this many records if it exist on server.
 */

exports.getCharacterURL = function(limit) {
    return Alloy.CFG.baseURL + "public/creators?limit="+ limit +"&apikey=" + Alloy.CFG.apiKey + "&hash=" + Alloy.CFG.hash + "&ts=" + Alloy.CFG.timestamp;
};