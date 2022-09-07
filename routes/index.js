const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/not-found');
const { validateSignIn, validateSignUp } = require('../middlewares/validations');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('access-token').send({ message: 'Вы вышли из системы' });
});

router.use('/users', auth, require('./user'));
router.use('/movies', auth, require('./movie'));

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
