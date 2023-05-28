const { makePlayersRequest, updateTeam, updateRole } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Player = require("../models/Player");

//function populating db, not for use from frontend
const addPlayers = (req, res) => {
  const url = `${process.env.FPL_API}/bootstrap-static/`;
  let result;
  makePlayersRequest(url)
    .then(async (data) => {
      result = data["elements"];
      const players = result.map((elem) => {
        const {
          web_name,
          goals_scored,
          assists,
          team,
          id,
          element_type,
          total_points,
          now_cost,
        } = elem;
        const updatedTeam = updateTeam(team);
        const updatedRole = updateRole(element_type);
        return {
          web_name,
          goals_scored,
          assists,
          team: updatedTeam,
          id,
          element_type: updatedRole,
          total_points,
          now_cost,
        };
      });
      await Player.insertMany(players);
      res.status(StatusCodes.CREATED).json({ msg: "Players Added" });
    })
    .catch((error) => console.log(error));
};

const deletePlayers = async (req, res) => {
  try {
    await Player.deleteMany({});
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    console.log(error);
  }
};

const getPlayers = async (req, res) => {
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
module.exports = {
  addPlayers,
  getTeamManagerPlayers,
  getPlayers,
  deletePlayers,
};
