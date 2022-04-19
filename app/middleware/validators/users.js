const { body } = require('express-validator');
const Users = require('../../schemas/User');
const errorMsg = require('../../data/error-message');

exports.email = () =>
  body('email')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isEmail()
    .withMessage('Email is invalid')
    .custom((value) =>
      Users.find({ email: value }).then((data) => {
        if (data.length) {
          return Promise.reject(errorMsg.UserExist());
        }
        return Promise.resolve('');
      })
    );

exports.emailForLogin = () =>
  body('email').not().isEmpty().withMessage('Must be filled');

exports.firstName = () =>
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .matches('^[a-zA-Z, ,-]+$')
    .withMessage(
      'Invalid format. Uppercase, lowercase, space and "-" letters are allowed'
    );

exports.lastName = () =>
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .matches('^[a-zA-Z, ,-]+$')
    .withMessage(
      'Invalid format. Uppercase, lowercase, space and "-" letters are allowed'
    );

exports.phone = () =>
  body('phone')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isMobilePhone('any')
    .withMessage('Phone is invalid');

exports.passwordForLogin = () =>
  body('password')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');

exports.password = () =>
  body('password')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string')
    .isLength({ min: 8 })
    .withMessage('Password must be 8 or more characters');

exports.isRemember = () =>
  body('isRemember').optional().isBoolean().withMessage('Must be boolean');

exports.roles = () =>
  body('roles')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isIn(['User', 'Volunteer', 'Shop'])
    .withMessage('Role is invalid');
