const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
  photos: [
    {
      photo: String,
    },
  ],
  description: String,
  products: [
    {
      count: Number,
      productType: String,
      price: Number,
    },
  ],
  price: Number,
  createdAt: Date,
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Report', schema);
