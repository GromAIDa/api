/* eslint-disable prefer-promise-reject-errors */
const { header, query } = require('express-validator');
const errorMsg = require('../../data/error-message');

exports.authorization = () =>
  header('Authorization').custom((value) => {
    if (value === process.env.AUTHORIZATION) {
      return Promise.resolve('');
    }
    return Promise.reject(errorMsg.Unauthorization);
  });

exports.limit = () =>
  query('limit')
    .optional()
    .isIn([5, 10, 20])
    .withMessage('Must be 5, 10 or 20');
