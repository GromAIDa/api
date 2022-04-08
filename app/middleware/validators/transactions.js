const { body } = require('express-validator');

exports.amount = () =>
  body('amount')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isNumeric()
    .withMessage('Must be number');
