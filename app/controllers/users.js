/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-underscore-dangle */
const errors = require('../middleware/errors/errors');
const User = require('../schemas/User');
const jwtService = require('../services/jwt.service');
const StatusCodes = require('../data/status-codes');
const errorsMsg = require('../data/error-message');
const cryptoService = require('../services/encryption.service');
const mailerService = require('../services/mailer.service');
const Subscribers = require('../schemas/Subscribers');

exports.register = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    User.findOneAndUpdate(
      { email: req.body.email, isEmailVerified: true },
      { ...req.body, status: 'ACTIVE' }
    ).then((data) => {
      if (data) {
        const { _id, roles, status, email } = data;
        const token = jwtService.jwtSign(
          {
            _id,
            roles,
            status,
            email,
          },
          true
        );
        mailerService.sendUserInfo(req.body);
        res.status(StatusCodes.CREATED).send({ token });
      } else {
        User.deleteOne({ email: req.body.email }).then(() => {
          res
            .status(StatusCodes.FORBIDDEN)
            .send(
              errors.CustomErrors(
                req.body.email,
                errorsMsg.EmailIsNotVerifited(),
                'email',
                'body'
              )
            );
        });
      }
    });
  }
};

exports.sendEmailVerification = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const { email } = req.body;
    User.findOne({ email }).then((data) => {
      mailerService.sendEmailVerification(data.verificationCode, email);
      res.status(StatusCodes.CREATED).send();
    });
  }
};

exports.subscribeUpdate = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    Subscribers.create({ email: req.body.email }).then(() => {
      res.status(StatusCodes.CREATED).send();
    });
  }
};

exports.sendEmailVerification = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const { email } = req.body;
    User.findOne({ email }).then((data) => {
      mailerService.sendEmailVerification(data.verificationCode, email);
      res.status(StatusCodes.CREATED).send();
    });
  }
};

exports.confirmEmailVerification = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    User.findOneAndUpdate(
      {
        email: req.body.email,
        isEmailVerified: false,
        verificationCode: req.body.verificationCode,
      },
      { isEmailVerified: true }
    ).then((data) => {
      if (data) {
        res.status(StatusCodes.OK).send({ email: data.email });
      } else {
        res
          .status(StatusCodes.FORBIDDEN)
          .send(
            errors.CustomErrors(
              req.body.verificationCode,
              errorsMsg.EmailOrCodeInvalid(),
              'verificationCode',
              'body'
            )
          );
      }
    });
  }
};

// exports.registerIdentity = (req, res) => {
//   if (!errors.ContainsError(req, res)) {
//     const { _id } = jwtService.jwtDecode(
//       req.headers.authorization.split(' ')[1]
//     ).payload;
//     User.updateOne({ _id }, { ...req.body, status: 'ACTIVE' }).then(
//       async () => {
//         const { email } = jwtService.jwtDecode(
//           req.headers.authorization.split(' ')[1]
//         ).payload;
//         res.status(StatusCodes.CREATED).send(
//           await mailerService.sendEmailVerification(
//             // link to email for testing, this won`t in the future
//             req.headers.authorization,
//             email
//           )
//         );
//       }
//     );
//   }
// };

exports.login = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    User.findOne({ email: req.body.email }).then((data) => {
      const { _id, roles, status, email } = data;
      if (data) {
        if (cryptoService.bcryptCheckPass(req.body.password, data.password)) {
          const token = jwtService.jwtSign(
            {
              _id,
              roles,
              status,
              email,
            },
            !req.body.isRemember
          );
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
