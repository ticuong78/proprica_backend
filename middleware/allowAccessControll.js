const allowedOrigins = require('../config/allowedOrigins');

const allowAccessControll = (req, res, next) => {
  if (allowedOrigins.indexOf(req.origin) != -1 || !req.origin) res.header('Access-Control-Allow-Credentials', true);
  else return res.status(403).send(new Error('Not Allowed By CORS'))
  next();
}

module.exports = allowAccessControll;