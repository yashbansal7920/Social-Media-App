const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({ user, token });
};

exports.signUp = async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;

    if (await User.findOne({ username })) {
      return res.status(400).json('username already exist');
    }

    if (await User.findOne({ email })) {
      return res.status(400).json('Email already exist');
    }

    if (password.length < 6)
      return res.status(400).json('Password must be greater than 6');

    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json('Please fill all fields');

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePasswords(password)))
      return res.status(401).json('Please provide vaild email and password');

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.socialLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const {
      payload: { email_verified: emailVerified, name, email },
    } = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    if (!emailVerified)
      res.status(400).json({
        error: 'Google login failed. Try again',
      });

    const user = await User.findOne({ email });

    if (!user) {
      const password = email + process.env.JWT_SECRET;
      const newUser = await User.create({
        email,
        name,
        username: name,
        password,
      });
      createSendToken(newUser, 201, res);
    } else {
      createSendToken(user, 200, res);
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

// exports.forgotPassword = async(req, res) => {
//   try {
//     const {email} = req.body;

//     const user = await User.findOne({email})
//     if(!user)
//     res.status(400).json('Please provide a valid email address');

//   } catch (error) {
//     res.status(400).json(error)
//   }
// };

// exports.resetPassword = (req, res) => {
//   res.send('resetPassword Route');
// };
