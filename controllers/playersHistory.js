const { getPlayerHistoryCost } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const PlayerHistory = require("../models/PlayerHistory");
const Player = require("../models/Player");

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
    console.log(error);
  }
};

module.exports = { addPlayersHistoryCost };
