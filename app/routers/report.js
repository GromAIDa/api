const reportController = require('../controllers/report');
const upload = require('../services/multer.service');
const reportValidators = require('../middleware/validators/report');
const validators = require('../middleware/validators/validators');

module.exports = function (app) {
  app.post(
    '/report',
    upload.array('files'),
    validators.authorization(),
    reportValidators.description(),
    reportValidators.price(),
    reportValidators.count(),
    reportValidators.products(),
    (req, res) => {
      reportController.addReport(req, res);
    }
  );

  app.get('/report', validators.limit(), (req, res) => {
    reportController.getReports(req, res);
  });
};
