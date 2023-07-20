const { getPlayerHistoryCost } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const PlayerHistory = require("../models/PlayerHistory");
const Player = require("../models/Player");
const { NotFoundError, BadRequestError } = require("../errors");

const addPlayersHistoryCost = async (req, res) => {
  try {
    const players = await Player.find({});
    players.map(async (player) => {
      const { id } = player;
      const cost_history = await getPlayerHistoryCost(id);
      await PlayerHistory.create({ id, cost_history });
    });
    res.status(StatusCodes.CREATED).json({ msg: "Players History Added" });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const getPlayersHistory = async (req, res) => {
  try {
    const players = await PlayerHistory.find({});
    res.status(StatusCodes.OK).json({ players });
  } catch (error) {
    throw new NotFoundError(error);
  }
};

module.exports = { addPlayersHistoryCost, getPlayersHistory };
