const router = require('express').Router();
const auth = require("../middlewares/auth");
const {listed, takenOnrent, givenOnRent} = require("../controllers/getMyTools.controller");

router.get("/listed", auth, listed);
router.get("/takenonrent", auth, takenOnrent);
router.get("/givenonrent", auth, givenOnRent);

module.exports=router;

//Dashboard