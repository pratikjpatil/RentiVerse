const router = require("express").Router();
const multerConfig = require("../config/multerConfig");
const auth = require("../middlewares/auth");

const addOnRent = require("../controllers/addOnRent.controller");

router.post("/addonrent", auth, multerConfig.array("images", 4), addOnRent);

module.exports = router;

//addOnRent page