const stripe = require('stripe')(
  'sk_test_51KlrwWCKknVOzNZdx75FSZahTmmQD0OSCBAwegdhG0iWy0IJSQVw7nF5jzbDlKfSeNPT80uvmWnO33KskWYVGEz000Hal72Onn'
);

const endpointSecret =
  'whsec_c4557dd1d54b635dcb886cd4a6a46f1e22240da9ac6fc8dc86bff41d07989ed7';

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
    const sig = req.headers['stripe-signature'];
    console.log(1, sig);
    console.log('body', req.body);

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log(2, event);
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(3, paymentIntent);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  }
};
