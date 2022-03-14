const { Route53Resolver } = require("aws-sdk");
const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostId,
  getLoggedInUserPosts,
} = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/user");

const router = express.Router();

router.route("/upload").post(isLoggedIn, createPost);
router.route("/update/:id").put(isLoggedIn, updatePost);
router.route("/delete/:id").delete(isLoggedIn, deletePost);
router.route("/posts").get(isLoggedIn, getAllPosts);
router.route("/post/:id").get(isLoggedIn, getPostId);
router.route("/posts/:id").get(isLoggedIn, getLoggedInUserPosts);

module.exports = router;
