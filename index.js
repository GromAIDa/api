const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const SwaggerJsDoc = require('swagger-jsdoc');

const cors = require('cors');
const mongoose = require('mongoose');
const swaggerOptions = require('./app/config/swagger-options');
const contractService = require('./app/services/contract.service');

const jsonParser = bodyParser.json();

const specs = SwaggerJsDoc(swaggerOptions.option);
const app = express();

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
const port = 3000;

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
