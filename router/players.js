const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  getTeamManagerPlayers,
} = require("../controllers/players");

router.route("/getAllPlayers").get(getAllPlayers);
router.route("/getTeamManagerPlayers").get(getTeamManagerPlayers);

module.exports = router;
