const router = require("express").Router();
const auth = require("../middlewares/auth");
const {confirmReturn, rejectReturn, changeReturnOrderStatus} = require("../controllers/productReturn.controller");

router.put("/confirm/:requestId", auth, confirmReturn);

router.put("/reject/:requestId", auth, rejectReturn);

router.put("/changeorderstatus", auth, changeReturnOrderStatus);

module.exports = router;
