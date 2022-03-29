const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const contractService = require('./app/services/contract.service');
require('dotenv').config();

app.use(cors());
require('./app/routers/routers')(app);


mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(async () => {
    app.listen(port, () => {
      console.log('Server has started!');
    });
    contractService.contractEventEmitter();
  });
