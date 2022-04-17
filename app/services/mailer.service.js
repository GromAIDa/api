const nodemailer = require('nodemailer');

exports.sendEmailVerification = async (token, address) => {
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
    text: 'Please press to button for verificate your account',
    html: ` <h1>GromAIDa</h1>
            <p>Please press to button for verificate your account</p>
            <a href='${process.env.FRONTEND_URL}email-verification/${token}'>Verify</a>`,
  });

  return nodemailer.getTestMessageUrl(info);
};
