const express = require('express');

const {
  postsByUser,
  getPost,
  createPost,
  deletePost,
  postsBySpecificUser,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
} = require('../controllers/postController');
const { isAuthorized } = require('../middlewares/private');
const upload = require('../middlewares/uploadPhoto');

const router = express.Router();

// To check user is authorized or not
router.use(isAuthorized);

router.route('/').get(postsByUser).post(upload.single('photo'), createPost);
router.route('/:id').get(getPost).delete(deletePost);
router.route('/user/:id').get(postsBySpecificUser);

// Like or Unlike
router.route('/like').patch(likePost);
router.route('/unlike').patch(unlikePost);

// Comments
router.route('/comment').patch(commentOnPost);
router.route('/deleteComment').patch(deleteComment);

module.exports = router;
