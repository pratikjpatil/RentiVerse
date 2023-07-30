const router = require("express").Router();
const multerConfig = require("../config/multerConfig");
const auth = require("../middlewares/auth");

const {addItems} = require("../controllers/item.controller");

router.post("/add-item", auth, multerConfig.array("images", 4), addItems);

module.exports = router;

//addOnRent page    