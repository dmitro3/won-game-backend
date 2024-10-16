const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/mine');

router.get('/:id', ctrl.mineData);
router.get('/', ctrl.mineIndi);
router.post('/:id', ctrl.mineDetail);
router.post('/', ctrl.mineType);
router.put('/:id', ctrl.wearItem);
module.exports = router;