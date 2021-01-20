const express = require('express');
const router = express.Router();

//Import controllers
const { addResult } = require('../controllers/results');

router.post('/', addResult);

module.exports = router;
