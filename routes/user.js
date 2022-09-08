const router = require('express').Router();
const {
  getCurrentUserInfo,
  updateUserInfo,
} = require('../controllers/user');
const { validateUpdateUserInfo } = require('../middlewares/validations');

router.get('/me', getCurrentUserInfo);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
