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
      return Promise.reject('count is undefined');
    }
    if (!products[0].productType) {
      return Promise.reject('productType is undefined');
    }
    if (!products[0].productName) {
      return Promise.reject('productName is undefined');
    }
    if (!products[0].price) {
      return Promise.reject('price is undefined');
    }
    return Promise.resolve();
  });
