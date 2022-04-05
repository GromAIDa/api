const transitionController = require('../controllers/transition');
const commonValidators = require('../middleware/validators/common-validators');

module.exports = function (app) {
  app.get('/transition', commonValidators.limit(), (req, res) => {
    transitionController.getTransitions(req, res);
  });

  app.get('/total', (req, res) => {
    transitionController.getTotalInfo(req, res);
  });
};
