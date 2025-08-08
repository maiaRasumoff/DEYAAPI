const express = require('express');
const { listEvents, getEventDetail } = require('../controllers/eventController');

const router = express.Router();

router.get('/', listEvents);
router.get('/:id', getEventDetail);

module.exports = router; 