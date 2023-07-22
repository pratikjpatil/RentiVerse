const router = require('express').Router();
const {showAllProds} = require('../controllers/showAllProducts.controller');

router.get('/',showAllProds);

module.exports=router;


//landing page