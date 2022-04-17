const jwt = require('jsonwebtoken');

exports.jwtSign = (data) =>
  jwt.sign(data, process.env.AUTHORIZATION, {
    algorithm: 'HS256',
    expiresIn: '24h',
  });

exports.jwtVerify = (token) => jwt.verify(token, process.env.AUTHORIZATION);

exports.jwtDecode = (token) => jwt.decode(token, { complete: true });
