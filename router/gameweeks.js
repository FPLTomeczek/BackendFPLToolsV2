const express = require("express");
const router = express.Router();
const {
  addGameweeks,
  getGameweeks,
  deleteGameweeks,
} = require("../controllers/gameweeks");

//post function populating db, not for use from frontend
router.route("/").post(addGameweeks).get(getGameweeks).delete(deleteGameweeks);

module.exports = router;
