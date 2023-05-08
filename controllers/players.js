const { makePlayersRequest } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Player = require("../models/Player");

const getAllPlayers = (req, res) => {
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

const getTeamManagerPlayers = async (req, res) => {
  const { ids } = req.query;
  const parsedIDs = JSON.parse(ids);
  const players = await Player.find({
    id: {
      $in: parsedIDs,
    },
  }).catch((err) => console.log(err));
  if (players) {
    res.status(StatusCodes.OK).json({ players });
  } else {
    throw NotFoundError("Players not found");
  }
};
module.exports = { getAllPlayers, getTeamManagerPlayers };
