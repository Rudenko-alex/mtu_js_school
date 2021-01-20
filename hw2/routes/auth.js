const router = require('express').Router();
const mongoose = require('mongoose');

const auth = require('../controllers/auth');

router.post('/', auth.login);

router.post('/register', auth.register);

module.exports = router;
