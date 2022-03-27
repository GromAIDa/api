const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
  balance: Number,
  from: String,
  to: String,
  value: String,
  data: {
    blockNumber: Number,
    blockHash: String,
    transactionIndex: Number,
    removed: Boolean,
    address: String,
    data: String,
    topics: [String],
    transactionHash: String,
    logIndex: Number,
    // removeListener: [Function (anonymous)],
    // getBlock: [Function (anonymous)],
    // getTransaction: [Function (anonymous)],
    // getTransactionReceipt: [Function (anonymous)],
    event: String,
    eventSignature: String,
  },
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Transition', schema);
