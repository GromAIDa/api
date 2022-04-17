const CryptoJS = require('crypto-js');

exports.encrypt = (data) =>
  CryptoJS.AES.encrypt(data, process.env.SECRET_KEY_ENCRYPY).toString();

exports.decrypt = (ciphertext) =>
  CryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY_ENCRYPY).toString(
    CryptoJS.enc.Utf8
  );
