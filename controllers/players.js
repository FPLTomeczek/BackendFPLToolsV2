const { makePlayersRequest } = require("../utils");
const Player = require("../models/Player");

const getPlayers = (req, res) => {
  const url = `${process.env.FPL_API}/bootstrap-static/`;
  let result;
  makePlayersRequest(url)
    .then(async (data) => {
      result = data["elements"];
      const players = result.map((elem) => {
        const { web_name, goals_scored, assists, team, id } = elem;
        return { web_name, goals_scored, assists, team, id };
      });
      await Player.insertMany(players);

      res.status(200).json({ msg: "Players Added" });
    })
    .catch((error) => console.log(error));
};

module.exports = { getPlayers };
