const request = require("request");

function makePlayersRequest(url) {
  return new Promise(function (resolve, reject) {
    request({ url, json: true }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = { makePlayersRequest };
