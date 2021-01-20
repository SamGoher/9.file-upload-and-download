const multer = require(`multer`);
const path = require(`path`);

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, `${path.basename(file.originalname)}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

module.exports = storage;