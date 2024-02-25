const multer = require("multer");

const multerConfig = multer({
  limits: {
    fileSize: 6 * 1024 * 1024, // 6 MB limit per image
    files: 4, 
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Log destination directory
      console.log("Destination Directory:", './uploads');
      cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
      // Log original filename
      console.log("Original Filename:", file.originalname);
      cb(null, file.originalname); 
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      // Log allowed image
      console.log("Allowed Image:", file.originalname);
      cb(null, true);
    } else {
      // Log disallowed file
      console.log("Disallowed File:", file.originalname);
      cb(new Error("Only images are allowed."));
    }
  },
});

module.exports = multerConfig;
