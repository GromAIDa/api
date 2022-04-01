const errors = require('../middleware/errors/errors');
const Product = require('../schemas/Product');
const productService = require('../services/products.service');

exports.getProducts = (req, res) => {
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
    Product.paginate({}, options, (err, data) => {
      res.status(200).send({ data });
    });
  }
};

exports.postProducts = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    Product.create(req.body).then((data) => {
      if (data) {
        res.status(200).send({ data });
      }
    });
  }
};

exports.postProductsByFile = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    if (!req.file) {
      res.status(401).send({
        errors: [
          {
            value: [],
            msg: 'File is empty',
            param: 'file',
            location: 'files',
          },
        ],
      });
    } else {
      productService.productsUploadByCsv(req, res);
    }
  }
};
