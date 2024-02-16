const express = require('express');
const router = express.Router();
const { 
  getTeamInfo
} = require('../controller/teamController');

router.get('/teams/:id', getTeamInfo);
router.get('/teams/schedule/:id', getTeamInfo);

module.exports = router;