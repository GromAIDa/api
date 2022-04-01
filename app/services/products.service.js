/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Product = require('../schemas/Product');

exports.productsUploadByCsv = async (req, res) => {
  let type = '';
  Product.collection.drop().then(() => {
    fs.createReadStream(path.resolve(__dirname, req.file.filename))
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        type = row.type || type;
        const data = { ...row, type };
        Product.create(data);
      })
      .on('end', (rowCount) => {
        fs.unlink(req.file.path, () => {
          res.status(200).send(`${rowCount} files has uploaded`);
        });
      });
  });
};
