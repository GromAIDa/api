const reportController = require('../controllers/report');
const upload = require('../services/multers/multer-photo.service');
const validators = require('../middleware/validators/validators');
const commonValidators = require('../middleware/validators/common-validators');

module.exports = function (app) {
  app.post(
    '/report',
    upload.array('files'),
    validators.reportValidatorsPost,
    (req, res) => {
      reportController.addReport(req, res);
    }
  );

  app.get('/report', commonValidators.limit(), (req, res) => {
    reportController.getReports(req, res);
  });
};
