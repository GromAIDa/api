const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const contractService = require('./app/services/contract.service');
require('dotenv').config();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.get('/', express.static(path.join(__dirname, './app/reports')));
require('./app/routers/routers')(app, jsonParser, urlencodedParser);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(async () => {
    app.listen(port, () => {
      console.log('Server has started!');
    });
    contractService.contractEventEmitter();
  });
