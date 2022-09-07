// http statuses
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

// security
const SALT_LENGTH = 10;
const JWT_SECRET_DEV = 'key';
const TOKEN_LIFETIME = '1d';

// server params
const PORT = 3000;

// db
const MONGO_DUPLICATE_CODE = 11000;
const MONGO_ADDRESS_DEV = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  PORT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  SALT_LENGTH,
  JWT_SECRET_DEV,
  TOKEN_LIFETIME,
  MONGO_DUPLICATE_CODE,
  MONGO_ADDRESS_DEV,
};
