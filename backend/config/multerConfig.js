const multer = require("multer");

const multerConfig = multer({
  limits: {
    fileSize: 6 * 1024 * 1024, // 6 MB limit per image
    files: 4, 
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/items/'); 
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
