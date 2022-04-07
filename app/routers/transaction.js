const bodyParser = require('body-parser');
const transactionController = require('../controllers/transaction');
const commonValidators = require('../middleware/validators/common-validators');

module.exports = function (app) {
  app.get('/transaction', commonValidators.limit(), (req, res) => {
    transactionController.getTransactions(req, res);
  });

  app.post(
    '/webhook',
    bodyParser.raw({ type: 'application/json' }),
    (req, res) => {
      transactionController.createPaymentIntent(req, res);
    }
  );

  app.get('/total', (req, res) => {
    transactionController.getTotalInfo(req, res);
  });
};
