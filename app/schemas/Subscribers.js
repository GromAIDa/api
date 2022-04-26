const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subscribers', schema);
