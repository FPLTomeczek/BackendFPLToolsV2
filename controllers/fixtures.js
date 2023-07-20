const { fetchFixtures, updateTeam } = require("../utils");
const Fixture = require("../models/Fixture");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/index");

const getFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.find({});
    res.status(StatusCodes.OK).json(fixtures);
  } catch (error) {
    throw new NotFoundError("Fixtures not found");
  }
};
const addFixtures = async (req, res) => {
  let fixtures = await fetchFixtures();
  fixtures = fixtures.data.map((fixture) => {
    const { event, team_a, team_h, team_a_difficulty, team_h_difficulty } =
      fixture;

    const updatedTeamA = updateTeam(team_a);
    const updatedTeamH = updateTeam(team_h);

    return {
      event,
      team_a: updatedTeamA,
      team_h: updatedTeamH,
      team_a_difficulty,
      team_h_difficulty,
    };
  });
  try {
    await Fixture.insertMany(fixtures);
    res.status(StatusCodes.CREATED).json({ msg: "Fixtures Added" });
  } catch (error) {
    throw new BadRequestError("Fixtures not added");
  }
};

const deleteFixtures = async (req, res) => {
  try {
    await Fixture.deleteMany({});
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    throw new BadRequestError("Fixtures not deleted");
  }
};

module.exports = { addFixtures, deleteFixtures, getFixtures };
