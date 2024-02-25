const router = require("express").Router();
const multerConfig = require("../config/multerConfig");
const auth = require("../middlewares/auth");
const userIsVerified = require("../middlewares/checkUserVerification");

const { addProduct, productInfo, deleteProduct, updateAndMoveToListed } = require("../controllers/product.controller");

router.post("/add-product", auth, multerConfig.array("images", 4), addProduct);

router.get("/product-info/:productId", productInfo);

router.delete("/delete/:productId", auth, deleteProduct);

router.put("/update/:productId", auth, updateAndMoveToListed); //updates product in drafts and moves to listed

module.exports = router;
