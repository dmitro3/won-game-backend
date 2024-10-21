const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/character');

router.get('/', ctrl.viewCharacters);
router.post('/new', ctrl.addCharacter);
router.put('/:id', ctrl.unlockCharacter);

module.exports = router;