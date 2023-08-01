const router = require("express").Router();
const multerConfig = require("../config/multerConfig");
const auth = require("../middlewares/auth");

const {addItems, itemInfo} = require("../controllers/item.controller");

router.post("/add-item", auth, multerConfig.array("images", 4), addItems);

router.get("/item-info/:itemId", itemInfo);

module.exports = router;

