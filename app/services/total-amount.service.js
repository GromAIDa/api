const UsdtTransaction = require('../schemas/USDT-transaction');
const CreditTransaction = require('../schemas/Credit-transaction');
const error = require('../middleware/errors/errors');
const errorMsg = require('../data/error-message');

exports.getTotalTransactions = new Promise((resolve, reject) => {
  const total = {
    donated: 0,
    donators: 0,
    start: new Date(),
  };
  UsdtTransaction.find({ to: process.env.ADDRESS })
    .then((data) => {
      if (data.length) {
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
        total.start = data[0].createdAt;
      }
      CreditTransaction.find({})
        .then((credits) => {
          if (credits.length) {
            const separateEmails = [];
            credits.forEach((transaction) => {
              if (!separateEmails.includes(transaction.email)) {
                separateEmails.push(transaction.email);
              }
              total.donated += Number(transaction.amount);
            });
            total.donators += separateEmails.length;
            total.start =
              new Date(total.start) < new Date(credits[0].createdAt)
                ? total.start
                : credits[0].createdAt;
          }
          resolve(total);
        })
        .catch(() => {
          reject(
            error.CustomErrors(
              'total',
              errorMsg.InternalServerError,
              'total',
              'body'
            )
          );
        });
    })
    .catch(() => {
      reject(
        error.CustomErrors(
          'total',
          errorMsg.InternalServerError,
          'total',
          'body'
        )
      );
    });
});
