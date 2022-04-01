const { body } = require('express-validator');

exports.isBought = () =>
  body('isBought').optional().isBoolean().withMessage('Must be boolean');

exports.size = () => body('size').optional();

exports.type = () => body('type').not().isEmpty().withMessage('Must be filled');

exports.packing = () => body('packing').optional();

exports.productName = () =>
  body('productName').not().isEmpty().withMessage('Must be filled');

exports.count = () =>
  body('count')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isNumeric()
    .withMessage('Must be number');
