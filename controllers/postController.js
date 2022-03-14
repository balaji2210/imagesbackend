const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");

const Post = require("../models/Post");

exports.createPost = BigPromise(async (req, res, next) => {
  let image = {};

  if (!req.files) {
    return next(new CustomError("images are requied", 401));
  }

  let result = await cloudinary.v2.uploader.upload(
    req.files.photo.tempFilePath,
    {
      folder: "agumentik",
    }
  );
  (image.id = result.public_id),
    (image.secure_url = result.secure_url),
    (req.body.photo = image);
  req.body.user = req.user.id;

  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    post,
  });
});

exports.updatePost = BigPromise(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    usedFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    post,
  });
});

exports.deletePost = BigPromise(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new CustomError("No Product found", 401));
  }

  await cloudinary.v2.uploader.destroy(post.photo.id);

  await post.remove();

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
  });
});

exports.getAllPosts = BigPromise(async (req, res, next) => {
  const posts = await Post.find();

  if (!posts) {
    return res.status(400).json({
      message: "No posts",
    });
  }
  res.status(200).json({
    success: true,
    posts,
  });
});

exports.getPostId = BigPromise(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new CustomError("No POst found", 401));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

exports.getLoggedInUserPosts = BigPromise(async (req, res, next) => {
  const userId = req.params.id;

  const posts = await Post.find({ user: userId });

  if (!posts) {
    return next(new CustomError("No posts found", 401));
  }

  res.status(200).json({
    success: true,
    posts,
  });
});

exports.getAllPosts = BigPromise(async (req, res, next) => {
  const posts = await Post.find();

  if (!posts) {
    return next(new CustomError("No posts found", 401));
  }

  res.status(200).json({
    success: true,
    posts,
  });
});
