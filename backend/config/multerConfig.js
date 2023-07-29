const multer = require("multer");

const multerConfig = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB limit per image
    files: 4, // Allow up to 4 images
  },
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed."));
    }
  },
  dest: '../public/images/tools/',
});

module.exports = multerConfig;
