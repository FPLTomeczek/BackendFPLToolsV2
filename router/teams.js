const express = require("express");
const router = express.Router();
const { getTeams } = require("../controllers/teams");

router.route("/").get(getTeams);

module.exports = router;
