/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');

exports.ContainsError = (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.find((el) => el.param === 'authorization')) {
    return res.status(401).json({ errors: errors.array() });
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
