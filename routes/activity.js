const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/activity');

router.post('/:id', ctrl.viewActivity);
router.put('/:id', ctrl.updateActivity);

module.exports = router;