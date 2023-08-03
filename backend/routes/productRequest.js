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

router.get('/show-received-all', auth, showReceivedRequests);
router.get('/show-received-pending', auth, showPendingRequests_received);
router.get('/show-received-accepted', auth, showAcceptedRequests_received);
router.get('/show-received-rejected', auth, showRejectedRequests_received);

router.get('/show-sent-all', auth, showSentRequests);
router.get('/show-sent-pending', auth, showPendingRequests_sent);
router.get('/show-sent-accepted', auth, showAcceptedRequests_sent);
router.get('/show-sent-rejected', auth, showRejectedRequests_sent);


module.exports = router;
