const router = require('express').Router();
const auth = require("../middlewares/auth");
const {getAllOrSearchProducts, getProductsByCategory, getRecentlyViewed, listed, takenOnrent, givenOnRent} = require('../controllers/getProducts.controller');

router.get('/', getAllOrSearchProducts); //for searching products pass query params - searchText, page, limit if not search text passed then sending any products
router.get("/category/:category", getProductsByCategory); //pass page and limit in query
router.get("/recently-viewed", auth, getRecentlyViewed)
router.get("/listed", auth, listed);
router.get("/takenonrent", auth, takenOnrent);
router.get("/givenonrent", auth, givenOnRent);

module.exports = router;