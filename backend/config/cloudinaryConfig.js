const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.ClOUD_KEY, 
  api_secret: process.env.ClOUD_SECRET
});

module.exports = cloudinary;