const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/shop');

router.post('/', ctrl.shopData);
router.put('/:id', ctrl.buyItem);

module.exports = router;