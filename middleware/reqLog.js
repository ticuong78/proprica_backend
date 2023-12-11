const { logEvents } = require('../utilities/logEvents');

const reqLog = async (req, res, next) => {
  logEvents(`${req.method}\t\t${req.origin}\t\t${req.path}`, 'reqLog.txt');
  next();
}

module.exports = reqLog;