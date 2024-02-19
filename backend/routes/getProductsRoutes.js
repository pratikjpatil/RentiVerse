const router = require('express').Router();
const auth = require("../middlewares/auth");
const {getAllOrSearchProducts, getProductsByCategory, getRecentlyViewed, listed, takenOnrent, givenOnRent, draftProducts} = require('../controllers/getProducts.controller');

router.get('/', getAllOrSearchProducts); //for searching products pass query params - searchText, page, limit if not search text passed then sending any products
router.get("/category/:category", getProductsByCategory); //pass page and limit in query
router.get("/recently-viewed", auth, getRecentlyViewed)
router.get("/listed", auth, listed);
router.get("/drafts", auth, draftProducts);
router.get("/takenonrent", auth, takenOnrent); //query returnsPage=true returns different data of products
router.get("/givenonrent", auth, givenOnRent); //query returnsPage=true returns different data of products

module.exports = router;