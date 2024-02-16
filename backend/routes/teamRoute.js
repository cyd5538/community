const express = require('express');
const router = express.Router();
const { 
  getTeamInfo,
  getTeamSchedule
} = require('../controller/teamController');

router.get('/teams/:id', getTeamInfo);
router.get('/teams/schedule/:id', getTeamSchedule);

module.exports = router;