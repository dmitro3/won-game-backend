const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/other');

router.get('/monster', ctrl.monsters);
router.get('/challenge/:id', ctrl.challenge);
router.post('/level/new', ctrl.addLevel);
router.post('/monster/new', ctrl.addMonster);
router.post('/challenge/new', ctrl.addChallenge);

module.exports = router;