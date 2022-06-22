const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema(
  {
    photos: [
      {
        photo: String,
      },
    ],
    title: String,
    description: String,
    timeToRead: Number,
    views: { default: 0, type: Number },
  },
  {
    timestamps: true,
  }
);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', schema);
