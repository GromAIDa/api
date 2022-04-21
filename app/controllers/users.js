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
          res.status(StatusCodes.FORBIDDEN).send();
        });
      }
    });
  }
};

exports.sendEmailVerification = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const { email } = req.body;
    const verificationCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
    User.findOneAndUpdate({ email }, { verificationCode }).then(
      async (data) => {
        if (data) {
          if (data.isEmailVerified) {
            res.status(StatusCodes.FORBIDDEN).send();
          } else {
            res.status(StatusCodes.CREATED).send(
              await mailerService.sendEmailVerification(
                // link to email for testing, this won`t in the future
                verificationCode,
                email
              )
            );
          }
        } else {
          User.create({ email, verificationCode }).then(async () => {
            res.status(StatusCodes.CREATED).send(
              await mailerService.sendEmailVerification(
                // link to email for testing, this won`t in the future
                verificationCode,
                email
              )
            );
          });
        }
      }
    );
  }
};

exports.confirmEmailVerification = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    User.findOneAndUpdate(
      {
        email: req.body.email,
        isEmailVerified: false,
      },
      { isEmailVerified: true }
    ).then((data) => {
      if (data) {
        if (data.verificationCode === req.body.verificationCode) {
          res.status(StatusCodes.OK).send({ email: data.email });
        } else {
          res.status(StatusCodes.BAD_REQUEST).send();
        }
      } else {
        res.status(StatusCodes.FORBIDDEN).send();
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
