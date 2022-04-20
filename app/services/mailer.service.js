const nodemailer = require('nodemailer');

exports.sendEmailVerification = async (code, address) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"GromAIDa" <foo@example.com>',
    to: address,
    subject: 'Hello ✔',
    text: 'Verification code',
    html: ` <h1>GromAIDa</h1>
            <p>Your verification code - <strong>${code}</strong></p>`,
  });

  return nodemailer.getTestMessageUrl(info);
};

exports.sendUserInfo = async (user) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"GromAIDa" <foo@example.com>',
    to: 'foo@example.com',
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
  console.log(nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info);
};
