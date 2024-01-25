const express = require('express');
const router = express.Router();
const { getLeagueLank } = require('../controller/footballController');

router.get('/:league/standings', getLeagueLank);

module.exports = router;