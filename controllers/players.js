const { makeBootstrapRequest, updateTeam, updateRole } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Player = require("../models/Player");

//function populating db, not for use from frontend
const addPlayers = (req, res) => {
  let result;
  makeBootstrapRequest()
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
          chance_of_playing_next_round,
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
          availability: chance_of_playing_next_round,
          scoring_chance: Math.floor(Math.random() * 100),
        };
      });
      await Player.insertMany(players);
      res.status(StatusCodes.CREATED).json({ msg: "Players Added" });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deletePlayers = async (req, res) => {
  try {
    await Player.deleteMany({});
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    res.status(StatusCodes.OK).json({ players });
  } catch (error) {
    throw new NotFoundError(error);
  }
};

const getManagerPicks = async (req, res) => {
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
  getManagerPicks,
  getPlayers,
  deletePlayers,
};
