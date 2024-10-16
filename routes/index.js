const express = require('express');
const router = express.Router();

const user = require('./user');
const shop = require('./shop');
const mine = require('./mine');
const milestone = require('./milestone');
const character = require('./character');
const etc = require('./other');

router.use('/user', user);
router.use('/shop', shop);
router.use('/mine', mine);
router.use('/milestone', milestone);
router.use('/character', character);
router.use('/etc', etc);

module.exports = router;
