exports.getCharacterURL = function(limit) {
    return Alloy.CFG.baseURL + "public/creators?limit="+ limit +"&apikey=" + Alloy.CFG.apiKey + "&hash=" + Alloy.CFG.hash + "&ts=" + Alloy.CFG.timestamp;
};
