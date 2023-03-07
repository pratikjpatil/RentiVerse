const {showAllProds}=require('../controllers/showAllProducts.controller');
const router=require('express').Router();

router.get('/allproducts',showAllProds);

module.exports=router;