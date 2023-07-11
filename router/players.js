const express = require("express");
const router = express.Router();
const {
  addPlayers,
  getManagerPicks,
  getPlayers,
  deletePlayers,
} = require("../controllers/players");

//post function populating db, not for use from frontend
router.route("/").post(addPlayers).get(getPlayers).delete(deletePlayers);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

router.route("/manager-picks").get(getManagerPicks);

module.exports = router;
