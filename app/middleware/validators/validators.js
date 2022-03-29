/* eslint-disable prefer-promise-reject-errors */
const { header, query } = require('express-validator');

exports.authorization = () =>
  header('Authorization').custom((value) => {
    if (value === process.env.AUTHORIZATION) {
      return Promise.resolve('Authorization');
    }
    return Promise.reject('Unauthorization');
  });

exports.limit = () =>
  query('limit')
    .optional()
    .isIn([5, 10, 20])
    .withMessage('Must be 5, 10 or 20');
