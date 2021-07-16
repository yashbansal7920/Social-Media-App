const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    let users;
    if (req.query.name) {
      const query = new RegExp(`^${req.query.name}`, 'g');
      users = await User.find({
        $or: [{ slug: { $regex: query } }, { username: { $regex: query } }],
      });
    } else {
      users = await User.find();
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(401).send('You are not authorized to see this route');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updateMe = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file) req.body.profilePhoto = req.file.filename;

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v -slug');

    if (!user) return res.status(404).json('No user Found');

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};
