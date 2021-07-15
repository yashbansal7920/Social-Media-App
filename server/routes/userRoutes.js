const express = require('express');

const {
  getAllUsers,
  getMe,
  updateMe,
} = require('../controllers/userController');
const { isAuthorized } = require('../middlewares/private');
const upload = require('../middlewares/uploadPhoto');

const router = express.Router();

router.route('/').get(isAuthorized, getAllUsers);
router.route('/me').get(isAuthorized, getMe);
router.route('/updateMe').patch(isAuthorized, upload.single('photo'), updateMe);

module.exports = router;
