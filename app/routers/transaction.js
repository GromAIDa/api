const bodyParser = require('body-parser');
const transactionController = require('../controllers/transaction');
const commonValidators = require('../middleware/validators/common-validators');

const rowParser = bodyParser.raw({ type: 'application/json' });

module.exports = function (app) {
  app.get('/transaction', commonValidators.limit(), (req, res) => {
    transactionController.getTransactions(req, res);
  });

  app.post('/create-payment-intent', (req, res) => {
    transactionController.createPaymentIntent(req, res);
  });

  app.post('/transaction/currency', (req, res) => {
    transactionController.createTransactionInCurrency(req, res);
  });

  app.get('/total', (req, res) => {
    transactionController.getTotalInfo(req, res);
  });

  app.post('/webhook', rowParser, (req, res) => {
    transactionController.createTransactionInCurrency(req, res);
  });
};
