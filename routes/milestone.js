const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/milestone');

router.post('/:id', ctrl.milestoneData);
router.put('/:id', ctrl.updateStone);
module.exports = router;