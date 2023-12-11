const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3500;

const cors = require("cors");
const corsOption = require('./config/corsOption');
const allowAccessControll = require('./middleware/allowAccessControll');
const reqLog = require('./middleware/reqLog');
const cookieParser = require('cookie-parser');

app.use(require("express-status-monitor")());

app.use(reqLog);

app.use(allowAccessControll);
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.use('/item', require('./routes/item'));


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));