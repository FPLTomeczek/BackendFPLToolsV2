const express = require("express");
const router = express.Router();
const {
  postFixtures,
  deleteFixtures,
  getFixtures,
} = require("../controllers/fixtures");

//post function populating db, not for use from frontend
router.route("/").get(getFixtures).post(postFixtures).delete(deleteFixtures);
// router.route("/addPlayerHistoryCost").get(addPlayerHistoryCost);

module.exports = router;
