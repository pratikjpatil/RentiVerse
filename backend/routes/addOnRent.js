const router = require("express").Router();
const auth = require("../middlewares/auth");
const addOnRent = require("../controllers/addOnRent.controller");

router.post("/addonrent", auth, addOnRent);

module.exports = router;

//addOnRent page