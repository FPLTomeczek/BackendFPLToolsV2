const { makePlayersRequest } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Player = require("../models/Player");

//function populating db, not for use from frontend
const addAllPlayers = (req, res) => {
  const url = `${process.env.FPL_API}/bootstrap-static/`;
  let result;
  makePlayersRequest(url)
    .then(async (data) => {
      result = data["elements"];
      const players = result.map((elem) => {
        const { web_name, goals_scored, assists, team, id, element_type } =
          elem;
        return { web_name, goals_scored, assists, team, id, element_type };
      });
      await Player.insertMany(players);

      res.status(StatusCodes.CREATED).json({ msg: "Players Added" });
    })
    .catch((error) => console.log(error));
};

const getAllPlayers = async (req, res) => {
  const players = await Player.find({});
  res.status(StatusCodes.OK).json({ players });
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
module.exports = { addAllPlayers, getTeamManagerPlayers, getAllPlayers };
