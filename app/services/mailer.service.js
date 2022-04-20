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
