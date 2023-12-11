const path = require("path");
const fs = require('fs');
const fsPromises = fs.promises;
const { v4: uuid } = require('uuid');
const { format } = require('date-fns');

const logEvents = async (msg, filePath) => {
  const date = format(new Date(), "dd/MM/yyyy\t\tHH:mm");
  const message = `${date}\t\t${uuid()}\t\t${msg}\n`;

  if (!fs.existsSync("log")) await fsPromises.mkdir("log");

  await fsPromises.appendFile(path.join(__dirname, "..", "log", filePath), message);
}


const errorLog = async (errMsg) => {
  logEvents(errMsg, "errLog.txt");
}


module.exports = { logEvents, errorLog };