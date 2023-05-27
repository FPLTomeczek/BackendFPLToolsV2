const express = require("express");
const router = express.Router();
const { addPlayersHistoryCost } = require("../controllers/playersHistory");

//post function populating db, not for use from frontend
router.route("/").post(addPlayersHistoryCost);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

module.exports = router;
