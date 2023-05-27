const express = require("express");
const router = express.Router();
const {
  addAllPlayers,
  getTeamManagerPlayers,
  getAllPlayers,
} = require("../controllers/players");

//post function populating db, not for use from frontend
router.route("/").post(addAllPlayers).get(getAllPlayers);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

router.route("/getTeamManagerPlayers").get(getTeamManagerPlayers);

module.exports = router;
