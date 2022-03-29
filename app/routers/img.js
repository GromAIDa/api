const path = require('path');
const validators = require('../middleware/validators/img');

module.exports = function (app) {
  app.get('/img', validators.photo(), (req, res) => {
    console.log(req.query.photo);
    res.sendFile(path.join(__dirname, `../reports/${req.query.photo}`));
  });
};
