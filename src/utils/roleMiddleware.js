const AppError = require('./AppError');

const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.role || req.role != role) {
      throw new AppError('Unauthorized user', 401);
    }
    return next();
  };
};

module.exports = roleMiddleware;
