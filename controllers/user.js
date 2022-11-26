const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized');
const {
  SALT_LENGTH,
  JWT_SECRET_DEV,
  TOKEN_LIFETIME,
  MONGO_DUPLICATE_CODE,
} = require('../utils/constants');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return new NotFoundError('Пользователь по указанному id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return new NotFoundError('Пользователь по указанному id не найден');
      }
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь по указанному id не найден'));
      } else if (err.code === MONGO_DUPLICATE_CODE) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, SALT_LENGTH).then((hash) => User.create({
    email, password: hash, name,
  })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      } else if (err.code === MONGO_DUPLICATE_CODE) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильная почта или пароль'));
      } else {
        bcrypt.compare(password, user.password, (err, isValidPassword) => {
          if (!isValidPassword) {
            return next(new UnauthorizedError('Неправильная почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
            { expiresIn: TOKEN_LIFETIME },
          );
          return res.cookie('access_token', token, { httpOnly: true }).send({ message: 'Вы успешно авторизовались' });
        });
      }
    })
    .catch(next);
};
