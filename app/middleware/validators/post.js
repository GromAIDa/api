/* eslint-disable prefer-promise-reject-errors */
const { body, query } = require('express-validator');
const Post = require('../../schemas/Post');
const errorMsg = require('../../data/error-message');

exports.description = () =>
  body('description')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');

exports.title = () =>
  body('title')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .isString()
    .withMessage('Must be string');

exports.id = () =>
  query('id')
    .not()
    .isEmpty()
    .withMessage('Must be filled')
    .custom((value) =>
      Post.find({ _id: value }).then((data) => {
        if (!data.length) {
          return Promise.reject(errorMsg.IsNotFound());
        }
        return Promise.resolve('');
      })
    );
