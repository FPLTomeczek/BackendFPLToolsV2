const { getFixtures } = require("../utils");

const postFixtures = async (req, res) => {
  const fixtures = await getFixtures();
  console.log(fixtures);
};

module.exports = { postFixtures };
