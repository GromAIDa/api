const fs = require('fs');
const Report = require('../schemas/Report');
const errors = require('../middleware/errors/errors');

exports.getReports = (req, res) => {
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
    Report.paginate({}, options, (err, data) => {
      res.status(200).send({ data });
    });
  }
};

exports.addReport = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    if (!req.files.length) {
      res.status(401).send({
        errors: [
          {
            value: [],
            msg: 'Photos is empty',
            param: 'photo',
            location: 'files',
          },
        ],
      });
    } else {
      Report.create({
        photos: req.files.map((el) => ({
          photo: el.path,
        })),
        description: req.body.description,
        products: JSON.parse(req.body.products),
        createdAt: Date.now(),
      }).then((data) => {
        if (data) {
          res.status(200).send({ data });
        }
      });
    }
  } else {
    req.files
      .map((el) => ({
        photo: el.path,
      }))
      .forEach((element) => {
        const path = element.photo;
        fs.unlink(path);
      });
  }
};
