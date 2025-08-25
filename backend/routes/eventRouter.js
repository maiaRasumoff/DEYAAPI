const express = require('express');
const { listEvents, getEventDetail, getEventFullDetail, getBarrioById } = require('../controllers/eventController');
const { validateId } = require('../middlewares/validation');

const router = express.Router();

router.get('/', listEvents);
router.get('/:id', validateId, getEventDetail);
router.get('/:id/full', validateId, getEventFullDetail);
router.get("/barrioId/:id", getBarrioById);




module.exports = router; 