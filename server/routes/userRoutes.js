const express = require('express');

const {
  getAllUsers,
  getMe,
  updateMe,
  getUser,
} = require('../controllers/userController');
const { isAuthorized } = require('../middlewares/private');
const upload = require('../middlewares/uploadPhoto');

const router = express.Router();

// This middleware is used for user is authorized or not
router.use(isAuthorized);

router.route('/me').get(getMe);
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);
router.route('/updateMe').patch(upload.single('photo'), updateMe);

module.exports = router;
