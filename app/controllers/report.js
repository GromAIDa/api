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
      const products = JSON.parse(req.body.products);
      Report.create({
        photos: req.files.map((el) => ({
          photo: el.filename,
        })),
        description: req.body.description,
        products,
        price: req.body.price,
      })
        .then((data) => {
          if (data) {
            res.status(200).send({ data });
          }
        })
        .catch((err) => {
          req.files
            .map((el) => ({
              photo: el.path,
            }))
            .forEach((element) => {
              const path = element.photo;
              fs.unlink(path, () => {
                res.status(401).json(err);
              });
            });
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
