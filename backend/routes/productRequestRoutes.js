const router = require('express').Router();
const auth = require("../middlewares/auth")
const userIsVerified = require("../middlewares/checkUserVerification");

const {
    sendRequest,
    showSentRequests,
    showReceivedRequests,
    acceptRequest,
    showAcceptedRequests_received,
    showAcceptedRequests_sent,
    rejectRequest,
    showRejectedRequests_received,
    showRejectedRequests_sent,
    showPendingRequests_sent, 
    showPendingRequests_received } = require('../controllers/productRequest.controller');

router.post('/send/:itemId', auth, userIsVerified, sendRequest);

router.put('/accept/:requestId', auth, userIsVerified, acceptRequest);
router.post('/reject/:requestId', auth, userIsVerified, rejectRequest);

router.get('/show-received-all', auth, userIsVerified, showReceivedRequests);
router.get('/show-received-pending', auth, userIsVerified, showPendingRequests_received);
router.get('/show-received-accepted', auth, userIsVerified, showAcceptedRequests_received);
router.get('/show-received-rejected', auth, userIsVerified, showRejectedRequests_received);

router.get('/show-sent-all', auth, userIsVerified, showSentRequests);
router.get('/show-sent-pending', auth, userIsVerified, showPendingRequests_sent);
router.get('/show-sent-accepted', auth, userIsVerified, showAcceptedRequests_sent);
router.get('/show-sent-rejected', auth, userIsVerified, showRejectedRequests_sent);


module.exports = router;
