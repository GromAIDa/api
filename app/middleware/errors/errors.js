/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const StatusCodes = require('../../data/status-codes');

exports.ContainsError = (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.find((el) => el.param === 'authorization')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ errors: errors.array() });
  }
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
};
