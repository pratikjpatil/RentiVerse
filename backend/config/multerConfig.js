const multer = require("multer");

const multerConfig = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit per image
    files: 4, 
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed."));
    }
  },
});

module.exports = multerConfig;
