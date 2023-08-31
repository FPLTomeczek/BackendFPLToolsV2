const { StatusCodes } = require("http-status-codes");
const Team = require("../models/Team");
const { fetchFixtures, updateTeam } = require("../utils");
const { all } = require("axios");
const { BadRequestError, NotFoundError } = require("../errors");

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(StatusCodes.OK).json({ teams });
  } catch (error) {
    throw new NotFoundError(error);
  }
};

const addTeams = async (req, res) => {
  const fixtures = await fetchFixtures();
  const allTeamsFixtures = [];
  for (let i = 1; i <= 20; i++) {
    const teamFixtures = fixtures.data.filter(
      (fixture) => fixture.team_a === i || fixture.team_h === i
    );

    const teamFixturesMapped = teamFixtures.map((teamFixture) => {
      const { team_a, team_h, team_h_difficulty, team_a_difficulty, event } =
        teamFixture;

      return {
        opponent: team_a === i ? updateTeam(team_h) : updateTeam(team_a),
        difficulty: team_a === i ? team_a_difficulty : team_h_difficulty,
        isHome: false,
        event,
      };
    });

    allTeamsFixtures.push({
      id: i,
      name: updateTeam(i),
      fixtures: teamFixturesMapped,
    });
  }

  try {
    const team = await Team.insertMany(allTeamsFixtures);
    res.status(StatusCodes.CREATED).json(team);
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const deleteTeams = async (req, res) => {
  try {
    await Team.deleteMany({});
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    throw new BadRequestError(error);
  }
};

module.exports = { getTeams, addTeams, deleteTeams };
