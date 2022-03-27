const Transition = require('../schemas/Transition');
const errors = require('../middleware/errors/errors');

exports.getTransitions = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const options = {
      page,
      limit,
      collation: {
        locale: 'en',
      },
    };
    Transition.paginate({}, options, (err, data) => {
      res.status(200).send({ data });
    });
  }
};
