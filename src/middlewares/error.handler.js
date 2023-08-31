const Boom = require('@hapi/boom');

const errorHandler = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    const { statusCode, payload } = err.output;
    return res.status(statusCode).json(payload);
  } else {
    const error = Boom.internal('Error interno del servidor', err);
    const { statusCode, payload } = error.output;
    return res.status(statusCode).json(payload);
  }
};

module.exports = errorHandler;
