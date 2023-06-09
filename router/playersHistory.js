const express = require("express");
const router = express.Router();
const {
  addPlayersHistoryCost,
  getPlayersHistory,
} = require("../controllers/playersHistory");

//post function populating db, not for use from frontend
router.route("/").post(addPlayersHistoryCost).get(getPlayersHistory);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

module.exports = router;
