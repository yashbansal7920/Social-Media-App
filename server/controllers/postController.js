const Post = require('../models/Posts');

exports.postsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id }).populate({
      path: 'postedBy',
      select: '_id name username',
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.postsBySpecificUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.id }).populate({
      path: 'postedBy',
      select: '_id name username ',
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    req.body.postedBy = req.user._id;
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate({
      path: 'postedBy comments.postedBy',
      select: '_id name username profilePhoto',
    });

    if (!post) res.status(404).json('No post found with that id');

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) res.status(404).json('No post found with that id');

    res.status(204).json({ status: 'successfully deleted' });
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    ).populate({
      path: 'postedBy comments.postedBy',
      select: '_id name username profilePhoto',
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    ).populate({
      path: 'postedBy comments.postedBy',
      select: '_id name username profilePhoto',
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    req.body.comment.postedBy = req.user._id;

    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: req.body.comment },
      },
      { new: true }
    ).populate({
      path: 'postedBy comments.postedBy',
      select: '_id name username profilePhoto',
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { comments: { _id: req.body.commentId } },
      },
      { new: true }
    ).populate({
      path: 'postedBy comments.postedBy',
      select: '_id name username profilePhoto',
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.followedUsersPosts = async (req, res) => {
  try {
    const { user: currentUser } = req;

    // const page = req.query.page * 1 || 1;
    // const skip = (page - 1) * 1;
    // .skip(skip).limit(1).

    const followersPosts = await Promise.all(
      currentUser.following.map(
        async (followId) =>
          await Post.find({ postedBy: followId }).populate({
            path: 'postedBy comments.postedBy',
            select: '_id name username profilePhoto',
          })
      )
    );

    const newPosts = followersPosts.flat(1).sort((p1, p2) => {
      const p1CreatedAt = new Date(p1.createdAt).getTime();
      const p2CreatedAt = new Date(p2.createdAt).getTime();

      return p2CreatedAt - p1CreatedAt;
    });

    res.status(200).json(newPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};
