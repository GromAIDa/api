const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Subscribers = require('../schemas/Subscribers');

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASS,
    },
  })
);

exports.sendEmailVerification = async (code, address) => {
  const info = await transporter.sendMail({
    from: `"GromAIDa" <${process.env.MAIL_ADDRESS}>`,
    to: address,
    subject: 'Hello ✔',
    text: 'Verification code',
    html: ` <h1>GromAIDa</h1>
            <p>Your verification code - <strong>${code}</strong></p>`,
  });

  return nodemailer.getTestMessageUrl(info);
};

exports.sendUserInfo = async (user) => {
  const info = await transporter.sendMail({
    from: `"GromAIDa" <${process.env.MAIL_ADDRESS}>`,
    to: process.env.MAIL_ADDRESS,
    subject: 'New User ✔',
    text: 'User',
    html: ` <h1>User details</h1>
            <p>First name: <strong>${user.firstName}</strong></p>
            <p>Last name: <strong>${user.lastName}</strong></p>
            <p>Phone: <strong>${user.phone}</strong></p>
            <p>Email: <strong>${user.email}</strong></p>
            <p>Roles: <strong>${user.roles}</strong></p>
            <p>Info: <strong>${user.info}</strong></p>`,
  });
  return nodemailer.getTestMessageUrl(info);
};

exports.sendUpdatesForSubscribers = async (update) => {
  const returnedData = await Subscribers.find({}).then(async (data) => {
    if (data.filter((el) => el.email).length) {
      const info = await transporter.sendMail({
        from: `"GromAIDa" <${process.env.MAIL_ADDRESS}>`,
        to: data.filter((el) => el.email).map((el) => el.email),
        subject: 'New Update ✔',
        text: 'Update',
        html: ` <h1>See what we have updated.</h1>
                <p>${update}</p>`,
      });
      return nodemailer.getTestMessageUrl(info);
    }
    return '';
  });
  return returnedData;
};
