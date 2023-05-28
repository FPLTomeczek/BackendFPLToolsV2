const express = require("express");
const router = express.Router();
const {
  addPlayers,
  getTeamManagerPlayers,
  getPlayers,
  deletePlayers,
} = require("../controllers/players");

//post function populating db, not for use from frontend
router.route("/").post(addPlayers).get(getPlayers).delete(deletePlayers);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

router.route("/getTeamManagerPlayers").get(getTeamManagerPlayers);

module.exports = router;
