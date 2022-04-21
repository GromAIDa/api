const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.encrypt = (data) =>
  CryptoJS.AES.encrypt(data, process.env.SECRET_KEY_ENCRYPY).toString();

exports.decrypt = (ciphertext) =>
  CryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY_ENCRYPY).toString(
    CryptoJS.enc.Utf8
  );

exports.bcryptCreatePass = (password) => bcrypt.hashSync(password, saltRounds);

exports.bcryptCheckPass = (password, hash) =>
  bcrypt.compareSync(password, hash);
