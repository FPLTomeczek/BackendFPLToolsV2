const { makePlayersRequest } = require("../utils");
const Player = require("../models/Player");

const getPlayers = (req, res) => {
  const url = `${process.env.FPL_API}/bootstrap-static/`;
  let result;
  makePlayersRequest(url)
    .then(async (data) => {
      result = data["elements"];
      const players = result.map((elem) => {
        const { web_name, goals_scored, assists, team } = elem;
        return { web_name, goals_scored, assists, team };
      });
      const playersInserted = await Player.insertMany(players);

      console.log("playersInserted", playersInserted);
      res.json(data);
    })
    .catch((error) => console.log(error));
};

module.exports = { getPlayers };
