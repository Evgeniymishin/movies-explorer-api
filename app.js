const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { PORT = 3000, MONGO_ADDRESS_DEV } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');

const { NODE_ENV, MONGO_ADDRESS } = process.env;

require('dotenv').config();

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_ADDRESS : MONGO_ADDRESS_DEV, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000',
    'localhost:3000',
    'https://evgeniymishin.moviesexplorer.nomorepartiesxyz.ru',
    'http://evgeniymishin.moviesexplorer.nomorepartiesxyz.ru'],
  credentials: true,
}));
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
