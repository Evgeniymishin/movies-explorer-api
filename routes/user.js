const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUserInfo,
  updateUserInfo,
} = require('../controllers/user');

router.get('/me', getCurrentUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

module.exports = router;
