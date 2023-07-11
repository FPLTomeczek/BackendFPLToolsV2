const { StatusCodes } = require("http-status-codes");
const Team = require("../models/Team");

const getTeams = async (req, res) => {
  const teams = await Team.find({});
  res.status(StatusCodes.OK).json({ teams });
};

module.exports = { getTeams };
