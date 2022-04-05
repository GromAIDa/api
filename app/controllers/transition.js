const Transition = require('../schemas/Transition');
const errors = require('../middleware/errors/errors');
const StatusCodes = require('../data/status-codes');

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
      res.status(StatusCodes.OK).send({ data });
    });
  }
};

exports.getTotalInfo = (req, res) => {
  Transition.find({ to: process.env.ADDRESS }).then((data) => {
    const total = {
      donators: 0,
      start: data[0].createdAt,
      donated: 0,
    };
    const separateAddresses = [];
    data.forEach((transition) => {
      if (
        !separateAddresses.includes(transition.from) &&
        transition.from !== process.env.ADDRESS
      ) {
        separateAddresses.push(transition.from);
      }
      if (transition.from !== process.env.ADDRESS) {
        total.donated += Number(transition.value);
      }
    });
    total.donators = separateAddresses.length;
    res.status(StatusCodes.OK).send({
      data: total,
    });
  });
};
