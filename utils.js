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

function updateTeam(team) {
  switch (team) {
    case 1:
      return "ARS";
    case 2:
      return "AVL";
    case 3:
      return "BOU";
    case 4:
      return "BRE";
    case 5:
      return "BHA";
    case 6:
      return "CFC";
    case 7:
      return "CRY";
    case 8:
      return "EVE";
    case 9:
      return "FUL";
    case 10:
      return "LEI";
    case 11:
      return "LEE";
    case 12:
      return "LIV";
    case 13:
      return "MCI";
    case 14:
      return "MUN";
    case 15:
      return "NEW";
    case 16:
      return "NFO";
    case 17:
      return "SOU";
    case 18:
      return "TOT";
    case 19:
      return "WHU";
    case 20:
      return "WOL";
    default:
      break;
  }
}

function updateRole(role) {
  switch (role) {
    case 1:
      return "GK";
    case 2:
      return "DEF";
    case 3:
      return "MID";
    case 4:
      return "FWD";
    default:
      break;
  }
}

module.exports = { makePlayersRequest, updateTeam, updateRole };
