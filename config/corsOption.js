const allowedOrigin = require('./allowedOrigins');

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else callback(new Error('Not allowed by CORS'), false);
  }
}

module.exports = corsOption;