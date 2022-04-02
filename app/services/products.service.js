/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Product = require('../schemas/Product');
const StatusCodes = require('../data/status-codes');

exports.productsUploadByCsv = async (req, res) => {
  let type = '';
  Product.collection.drop().then(() => {
    fs.createReadStream(path.resolve(__dirname, req.file.filename))
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        type = row.type || type;
        const data = {
          type: type.toLocaleLowerCase(),
          productName: row.productName.toLocaleLowerCase(),
          count: row.count,
          packing: row.packing.toLocaleLowerCase(),
          size: row.size.toLocaleLowerCase(),
          photo: row.photo,
          isBought: row.isBought,
        };
        Product.create(data);
      })
      .on('end', (rowCount) => {
        fs.unlink(req.file.path, () => {
          res.status(StatusCodes.OK).send(`${rowCount} files has uploaded`);
        });
      });
  });
};
