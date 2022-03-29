const transition = require('./transition');
const report = require('./report');

module.exports = (app) => {
  transition(app);
  report(app);
};
