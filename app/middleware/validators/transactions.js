const { body } = require('express-validator');

exports.amount = () =>
  body('amount')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isNumeric()
    .withMessage('Must be number');
exports.success_url = () =>
  body('success_url')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');
exports.cancel_url = () =>
  body('cancel_url')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');
exports.currency = () =>
  body('currency')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');
exports.description = () =>
  body('description')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');
