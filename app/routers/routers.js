const transition = require('./transition');
const report = require('./report');
const img = require('./img');

module.exports = (app) => {
  transition(app);
  report(app);
  img(app);
};
