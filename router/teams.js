const express = require("express");
const router = express.Router();
const { getTeams, addTeams, deleteTeams } = require("../controllers/teams");

router.route("/").get(getTeams).post(addTeams).delete(deleteTeams);

module.exports = router;
