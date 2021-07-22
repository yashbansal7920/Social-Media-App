const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please provide a photo to create a post'],
  },
  body: String,
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now() },
      postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
