const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  const xToken = req.headers['x-access-token'];
  if (!xToken) {
    throw new ClientError(401, 'Authentication required');
  } else {
    try {
      const payload = jwt.verify(xToken, process.env.TOKEN_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      next(err);
    }
  }

}

module.exports = authorizationMiddleware;
