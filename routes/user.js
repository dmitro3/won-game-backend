const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user');

router.post('/:id', ctrl.userData);
router.put('/:id', ctrl.updateUser);
router.get('/ranking', ctrl.ranking);

module.exports = router;