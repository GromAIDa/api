const transitionController = require('../controllers/transition');
const validators = require('../middleware/validators/validators');

module.exports = function (app) {
  app.get('/transition', validators.limit(), (req, res) => {
    transitionController.getTransitions(req, res);
  });
};
