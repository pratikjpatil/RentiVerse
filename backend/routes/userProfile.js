const router = require('express').Router();
const {userInformation, updateUser} = require('../controllers/userProfile.controller');
const auth = require('../middlewares/auth');

router.get('/me', auth, userInformation);
router.put('/edit', auth, updateUser);

module.exports = router;