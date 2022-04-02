const productValidator = require('./product');
const reportValidators = require('./report');
const commonValidators = require('./common-validators');

exports.productValidatorsPost = [
  commonValidators.authorization(),
  commonValidators.limit(),
  productValidator.isBought(),
  productValidator.size(),
  productValidator.type(),
  productValidator.packing(),
  productValidator.productName(),
  productValidator.count(),
];

exports.productValidatorsGet = [
  commonValidators.limit(),
  productValidator.query(),
  productValidator.queryType(),
];

exports.reportValidatorsPost = [
  commonValidators.authorization(),
  reportValidators.description(),
  reportValidators.price(),
  reportValidators.count(),
  reportValidators.products(),
];
