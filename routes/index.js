const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/not-found');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('access-token').send({ message: 'Вы вышли из системы' });
});

router.use('/users', auth, require('./user'));
router.use('/movies', auth, require('./movie'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
