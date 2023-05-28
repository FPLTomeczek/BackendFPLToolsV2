const express = require("express");
const router = express.Router();
const { postFixtures } = require("../controllers/fixtures");
const Fixtures = require("../models/Fixtures");

//post function populating db, not for use from frontend
router.route("/").post(Fixtures);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

module.exports = router;
