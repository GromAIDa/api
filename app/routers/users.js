const validators = require('../middleware/validators/validators');
const usersController = require('../controllers/users');
const transformerUser = require('../middleware/transformer/users');

module.exports = function (app, jsonParser) {
  app.post(
    '/register',
    jsonParser,
    validators.registerValidators,
    transformerUser.passwordToHex,
    (req, res) => {
      usersController.register(req, res);
    }
  );

  app.post('/login', jsonParser, validators.loginValidators, (req, res) => {
    usersController.login(req, res);
  });
};
