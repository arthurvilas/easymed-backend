const jwt = require('jsonwebtoken');
const AppError = require('./AppError');

const authMiddleware = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    throw new AppError('Unrecognized Token', 401);
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) {
    throw new AppError('Unrecognized Token', 401);
  }
  if (!payload.role) {
    throw new AppError('Unrecognized Token', 401);
  }

  req.role = payload.role;
  return next();
};

module.exports = authMiddleware;
