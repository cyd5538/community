const axios = require('axios');
const asyncHandler = require('express-async-handler');

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY

const getTeamInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`https://api.football-data.org/v4/teams/${id}`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,  
      },
    });

    const data = response.data

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: '서버 에러' });
  }
});

const getTeamSchedule = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`https://api.football-data.org/v4/teams/${id}/matches/`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,  
      },
    });

    const data = response.data

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: '서버 에러' });
  }
});

module.exports = {
  getTeamInfo,
  getTeamSchedule
}
