// basic-auth-middleware.js
const basicAuth = require('basic-auth');

function basicAuthMiddleware(req, res, next) {
  const unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === process.env.API_ADMIN_USER && user.pass === process.env.API_ADMIN_PWD) {
    return next();
  } else {
    return unauthorized(res);
  }
}

module.exports = basicAuthMiddleware;
