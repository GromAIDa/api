const stripe = require('stripe')(
  'sk_test_51KlrwWCKknVOzNZdx75FSZahTmmQD0OSCBAwegdhG0iWy0IJSQVw7nF5jzbDlKfSeNPT80uvmWnO33KskWYVGEz000Hal72Onn'
);

const Transaction = require('../schemas/Transaction');
const errors = require('../middleware/errors/errors');
const StatusCodes = require('../data/status-codes');

exports.getTransactions = (req, res) => {
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
    Transaction.paginate({}, options, (err, data) => {
      res.status(StatusCodes.OK).send({ data });
    });
  }
};

exports.getTotalInfo = (req, res) => {
  Transaction.find({ to: process.env.ADDRESS }).then((data) => {
    const total = {
      donators: 0,
      start: data[0].createdAt,
      donated: 0,
    };
    const separateAddresses = [];
    data.forEach((transaction) => {
      if (
        !separateAddresses.includes(transaction.from) &&
        transaction.from !== process.env.ADDRESS
      ) {
        separateAddresses.push(transaction.from);
      }
      if (transaction.from !== process.env.ADDRESS) {
        total.donated += Number(transaction.value);
      }
    });
    total.donators = separateAddresses.length;
    res.status(StatusCodes.OK).send({
      data: total,
    });
  });
};

exports.createPaymentIntent = async (req, res) => {
  if (!errors.ContainsError(req, res)) {
    stripe.paymentIntents.create(
      {
        amount: req.body.amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      },
      (err, paymentIntent) => {
        if (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
        } else {
          res.status(StatusCodes.CREATED).json(paymentIntent);
        }
      }
    );
  }
};

exports.createTransactionInCurrency = async (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const event = req.body;
    console.log(event);
    // console.log({
    //   id: event.data.object.id,
    //   object: event.data.object.object,
    //   amount: event.data.object.amount,
    //   amount_received: event.data.object.amount_received,
    //   currency: event.data.object.currency,
    // });
    res.json({ received: true });
  }
};
