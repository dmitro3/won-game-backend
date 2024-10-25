const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user');

router.post('/:id', ctrl.userData);
router.put('/:id', ctrl.updateUser);
router.put('/token/:id', ctrl.updateToken);
router.put('/withActivity/:id', ctrl.updateUserWithActivity);
router.get('/ranking', ctrl.ranking);

module.exports = router;