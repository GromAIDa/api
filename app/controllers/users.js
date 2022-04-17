/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-underscore-dangle */
const errors = require('../middleware/errors/errors');
const User = require('../schemas/User');
const jwtService = require('../services/jwt.service');
const StatusCodes = require('../data/status-codes');
const errorsMsg = require('../data/error-message');
const cryptoService = require('../services/encryption.service');

exports.register = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    User.create(req.body).then((data) => {
      const { _id, roles, status, email } = data;
      const token = jwtService.jwtSign({
        _id,
        roles,
        status,
        email,
      });
      res.status(StatusCodes.CREATED).send({ token });
    });
  }
};

exports.registerIdentity = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const { _id } = jwtService.jwtDecode(req.headers.authorization).payload;
    User.updateOne({ _id }, { ...req.body }).then(() => {
      res.status(StatusCodes.CREATED).send();
    });
  }
};

exports.emailVerification = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const { _id } = jwtService.jwtDecode(req.headers.authorization).payload;
    User.updateOne({ _id }, { isEmailVerified: true }).then(() => {
      res.status(StatusCodes.CREATED).send();
    });
  }
};

exports.login = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    User.findOne({ email: req.body.email }).then((data) => {
      const { _id, roles, status, email } = data;
      if (data) {
        if (cryptoService.bcryptCheckPass(req.body.password, data.password)) {
          const token = jwtService.jwtSign({
            _id,
            roles,
            status,
            email,
          });
          res.status(StatusCodes.OK).send({ token });
        } else {
          res.status(StatusCodes.FORBIDDEN).send(errorsMsg.CredentialsInvalid);
        }
      } else {
        res.status(StatusCodes.FORBIDDEN).send(errorsMsg.CredentialsInvalid);
      }
    });
  }
};
