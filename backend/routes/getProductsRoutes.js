const router = require('express').Router();
const auth = require("../middlewares/auth");
const {getProducts, listed, takenOnrent, givenOnRent} = require('../controllers/getProducts.controller');

router.get('/', getProducts); //for searching products pass query params - searchText, page, limit

router.get("/listed", auth, listed);
router.get("/takenonrent", auth, takenOnrent);
router.get("/givenonrent", auth, givenOnRent);

module.exports = router;