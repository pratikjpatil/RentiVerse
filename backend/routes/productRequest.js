const router = require('express').Router();
const auth = require("../middlewares/auth")

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

router.post('/send/:itemId', auth, sendRequest);

router.put('/accept/:requestId', auth, acceptRequest);
router.post('/reject/:requestId', auth, rejectRequest);

router.get('/show-received', auth, showReceivedRequests);
router.get('/show-pending-received', auth, showPendingRequests_received);
router.get('/show-accepted-received', auth, showAcceptedRequests_received);
router.get('/show-rejected-received', auth, showRejectedRequests_received);

router.get('/show-sent', auth, showSentRequests);
router.get('/show-pending-sent', auth, showPendingRequests_sent);
router.get('/show-accepted-sent', auth, showAcceptedRequests_sent);
router.get('/show-rejected-sent', auth, showRejectedRequests_sent);


module.exports = router;
