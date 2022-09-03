const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Пользователь с таким email уже существует'],
    required: [true, 'Поле email должно быть заполнено'],
    validate: {
      validator: isEmail,
      message: 'Поле email заполнено неккоректно',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина имени пользователя 2 символа'],
  },
});

module.exports = mongoose.model('user', userSchema);