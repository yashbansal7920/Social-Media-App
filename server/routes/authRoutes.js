const express = require('express');
const {
  signUp,
  login,
  socialLogin,
  // forgotPassword,
  // resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/social-login').post(socialLogin);
// router.route("/forgotPassword").post(forgotPassword);
// router.route("/resetPassword/:id").patch(resetPassword);

module.exports = router;
