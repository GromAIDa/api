const transition = require('./transition');
const report = require('./report');
const img = require('./img');
const product = require('./products');

module.exports = (app, jsonParser, urlencodedParser) => {
  transition(app);
  report(app);
  img(app);
  img(app);
  product(app, jsonParser);
};
