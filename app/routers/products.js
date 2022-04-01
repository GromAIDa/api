const validators = require('../middleware/validators/validators');
const productValidator = require('../middleware/validators/product');
const productsController = require('../controllers/product');
const upload = require('../services/multers/multer-csv.service');

module.exports = function (app, jsonParser) {
  app.get('/products', validators.limit(), (req, res) => {
    productsController.getProducts(req, res);
  });

  app.post(
    '/product',
    jsonParser,
    validators.authorization(),
    validators.limit(),
    productValidator.isBought(),
    productValidator.size(),
    productValidator.type(),
    productValidator.packing(),
    productValidator.productName(),
    productValidator.count(),
    (req, res) => {
      productsController.postProducts(req, res);
    }
  );

  app.post(
    '/products/file',
    upload.single('file'),
    validators.authorization(),
    (req, res) => {
      productsController.postProductsByFile(req, res);
    }
  );
};
