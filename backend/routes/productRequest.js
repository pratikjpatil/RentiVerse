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
    showRejectedRequests_sent } = require('../controllers/productRequest.controller');

router.post('/send/:toolId', auth, sendRequest);
router.get('/show-sent', auth, showSentRequests);
router.get('/show-received', auth, showReceivedRequests);

router.put('/accept/:requestId', auth, acceptRequest);
router.get('/show-accepted-received', auth, showAcceptedRequests_received);
router.get('/show-accepted-sent', auth, showAcceptedRequests_sent);

router.post('/reject/:requestId', auth, rejectRequest);
router.get('/show-rejected-received', auth, showRejectedRequests_received);
router.get('/show-rejected-sent', auth, showRejectedRequests_sent);


module.exports = router;
