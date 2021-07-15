const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthorized = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json('You are not authorized to access this route');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res
        .status(401)
        .json('The user belonging to this token does no longer exist.');
    }

    req.user = currentUser;
  } catch (error) {
    res.status(401).json(error);
  }

  next();
};
