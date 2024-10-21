const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/shop');

router.post('/', ctrl.shopData);
router.put('/:id', ctrl.buyItem);
router.post('/new', ctrl.makeItem);

module.exports = router;