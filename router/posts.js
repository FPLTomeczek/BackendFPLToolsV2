const express = require("express");
const router = express.Router();
const { addPost, getPosts, getPost } = require("../controllers/posts");

router.route("/").post(addPost).get(getPosts);
router.route("/:id").get(getPost);

module.exports = router;
