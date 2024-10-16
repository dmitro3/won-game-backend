const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/other');

router.get('/monster', ctrl.monsters);
router.get('/challenge/:id', ctrl.challenge);

module.exports = router;