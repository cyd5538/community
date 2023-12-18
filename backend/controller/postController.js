const asyncHandler = require('express-async-handler');
const Posts = require('../models/postModel');

const getPaginatedPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 10; 

  const skip = (page - 1) * pageSize;
  const posts = await Posts.find()
    .sort({ createdAt: 'desc' })
    .skip(skip)
    .limit(pageSize)
    .populate({
      path: 'likes comments user',
      select: '-password', 
    });

  res.status(200).json(posts);
});


const getPostsByLikes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 10; 

  const skip = (page - 1) * pageSize;

  const posts = await Posts.find()
    .sort({ likes: 'desc', createdAt: 'desc' }) 
    .skip(skip)
    .limit(pageSize)
    .populate({
      path: 'likes comments user',
      select: '-password', 
    });

  res.status(200).json(posts);
});


const createPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "제목을 입력해주세요" });
  }

  const post = await Posts.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    user: req.user.id,
  });

  res.status(200).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    res.status(400).json({ error: "포스트가 존재하지 않습니다" });
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401).json({ error: "인증되지 않은 유저입니다" });
  }

  const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    res.status(400).json({ error: "포스트가 존재하지 않습니다" });
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401).json({ error: "인증되지 않은 유저입니다" });
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPaginatedPosts,
  getPostsByLikes,
  createPost,
  updatePost,
  deletePost,
};
