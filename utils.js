const request = require("request");
const axios = require("axios");

function makeBootstrapRequest() {
  return new Promise(function (resolve, reject) {
    request(
      { url: `${process.env.FPL_API}/bootstrap-static/`, json: true },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      }
    );
  });
}

async function getPlayerHistoryCost(id) {
  const playerData = await axios.get(
    `${process.env.FPL_API}/element-summary/${id}/`
  );
  const { history } = playerData.data;
  const values = history.map((gw) => gw.value);
  return values;
}
async function fetchFixtures() {
  const fixtures = await axios.get(`${process.env.FPL_API}/fixtures`);
  return fixtures;
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
      return "BUR";
    case 7:
      return "CFC";
    case 8:
      return "CRY";
    case 9:
      return "EVE";
    case 10:
      return "FUL";
    case 11:
      return "LIV";
    case 12:
      return "LUT";
    case 13:
      return "MCI";
    case 14:
      return "MUN";
    case 15:
      return "NEW";
    case 16:
      return "NFO";
    case 17:
      return "SHU";
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

module.exports = {
  makeBootstrapRequest,
  updateTeam,
  updateRole,
  getPlayerHistoryCost,
  fetchFixtures,
};
