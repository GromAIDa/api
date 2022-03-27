/* eslint-disable prefer-promise-reject-errors */
const { body } = require('express-validator');

exports.description = () => body('description').optional();

exports.price = () =>
  body('price')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isNumeric()
    .withMessage('Must be number');

exports.count = () =>
  body('count').optional().isNumeric().withMessage('Must be number');

exports.productType = () =>
  body('productType').not().isEmpty().withMessage('Must be filled');
