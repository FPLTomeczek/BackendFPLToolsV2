const { fetchFixtures, updateTeam, makeBootstrapRequest } = require("../utils");
const Gameweek = require("../models/Gameweek");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/index");

const getGameweeks = async (req, res) => {
  try {
    const gameweeks = await Gameweek.find({});
    res.status(StatusCodes.OK).json(gameweeks);
  } catch (error) {
    throw new NotFoundError("Gameweeks not found");
  }
};
const addGameweeks = async (req, res) => {
  makeBootstrapRequest()
    .then(async (data) => {
      const events = data["events"];
      const gameweeks = events
        .map((gw) => {
          const { id, finished, deadline_time } = gw;
          return { id, finished, deadline_time };
        })
        .sort((a, b) => {
          return a.deadline_time.localeCompare(b.deadline_time);
        });
      await Gameweek.insertMany(gameweeks);
      res.status(StatusCodes.CREATED).json({ msg: "Gameweeks Added" });
    })
    .catch((err) => {
      throw new BadRequestError(err);
    });
};

const deleteGameweeks = async (req, res) => {
  try {
    await Gameweek.deleteMany({});
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (err) {
    throw new BadRequestError(err);
  }
};

module.exports = { getGameweeks, addGameweeks, deleteGameweeks };
