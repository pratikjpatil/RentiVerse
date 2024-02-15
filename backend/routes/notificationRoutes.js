const router = require("express").Router();
const auth = require("../middlewares/auth");
const {getAllNotifications} = require("../controllers/notification.controller");

router.get("/all", auth, getAllNotifications);

module.exports = router;
