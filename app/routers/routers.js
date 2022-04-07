const transaction = require('./transaction');
const report = require('./report');
const img = require('./img');
const product = require('./products');

module.exports = (app, jsonParser, urlencodedParser) => {
  transaction(app);
  report(app);
  img(app);
  img(app);
  product(app, jsonParser);
};
