const multer = require('multer');

const storage = multer.diskStorage({
  destination: '../../../var/www/html/assets',
  filename(req, file, cb) {
    cb(null, `${Date.now().toFixed()}.${file.mimetype.split('/')[1]}`);
  },
});
module.exports = multer({
  storage,
});
