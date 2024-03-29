const express = require('express');
const router = express.Router();
const { 
  getLeagueLank,
  getScoreLank
} = require('../controller/footballController');

router.get('/:league/standings/:season', getLeagueLank);
router.get('/:league/score/:season', getScoreLank);

module.exports = router;