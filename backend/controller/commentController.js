const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

const createComment = asyncHandler(async (req, res) => {
  const { user, post, text } = req.body;

  const newComment = await Comment.create({ user, post, text });

  await Post.findByIdAndUpdate(post, { $push: { comments: newComment._id }, $inc: { commentsCount: 1 } });

  res.status(201).json({ message: '댓글 등록 완료' });
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { text },
    { new: true }
  );

  res.status(200).json({ message: '댓글 수정 완료' });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    const postId = comment.post;

    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId }, $inc: { commentsCount: -1 } });

    await comment.deleteOne(); 

    res.status(204).json({ message: '댓글 삭제 완료' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
