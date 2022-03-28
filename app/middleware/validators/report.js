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

exports.products = () =>
  body('products').custom((value) => {
    const products = JSON.parse(value);
    if (!products[0].count) {
      return Promise.reject('Count is undefined');
    }
    if (!products[0].productType) {
      return Promise.reject('ProductType is undefined');
    }
    if (!products[0].price) {
      return Promise.reject('Price is undefined');
    }
    return Promise.resolve();
  });
