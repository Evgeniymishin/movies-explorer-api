const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movie');
const { validateCreateMovie, validateDeleteMovieById } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovieById, deleteMovieById);

module.exports = router;
