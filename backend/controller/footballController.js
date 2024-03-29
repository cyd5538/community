const axios = require('axios');
const asyncHandler = require('express-async-handler');

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY

const getLeagueLank = asyncHandler(async (req, res) => {
  const league = req.params.league;
  const season = req.params.season;

  try {
    const response = await axios.get(`https://api.football-data.org/v4/competitions/${league}/standings?season=${season}&matchday=38`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,  
      },
    });

    const data = response.data.standings[0]; 

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러' });
  }
});

const getScoreLank = asyncHandler(async (req, res) => {
  const league = req.params.league;
  const season = req.params.season;

  try {
    const response = await axios.get(`https://api.football-data.org/v4/competitions/${league}/scorers?season=${season}`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,  
      },
    });

    const data = response.data.scorers
   
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러' });
  }
});

module.exports = {
  getLeagueLank,
  getScoreLank
}
