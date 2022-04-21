const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'infogromaida@gmail.com',
      pass: 'NQfRsuWpQT',
    },
  })
);

exports.sendEmailVerification = async (code, address) => {
  const info = await transporter.sendMail({
    from: '"GromAIDa" <infogromaida@gmail.com>',
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
    from: '"GromAIDa" <infogromaida@gmail.com>',
    to: 'infogromaida@gmail.com',
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
