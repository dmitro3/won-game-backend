const express = require('express');
const router = express.Router();

const user = require('./user');
const shop = require('./shop');
const mine = require('./mine');
const character = require('./character');
const etc = require('./other');
const activity = require('./activity');

router.use('/user', user);
router.use('/shop', shop);
router.use('/mine', mine);
router.use('/character', character);
router.use('/etc', etc);
router.use('/activity', activity);

module.exports = router;
