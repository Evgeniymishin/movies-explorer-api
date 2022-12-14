const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле director должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле year должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле description должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле image должно быть заполнено'],
    validate: {
      validator: isURL,
      message: 'Поле image заполнено неккоректно',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink должно быть заполнено'],
    validate: {
      validator: isURL,
      message: 'Поле trailerLink заполнено неккоректно',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail должно быть заполнено'],
    validate: {
      validator: isURL,
      message: 'Поле thumbnail заполнено неккоректно',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
