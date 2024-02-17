import axios from "axios";

const API_URL = 'http://localhost:5000/api/football';

export const getLeagueRank = async (leagueChoice: string, season: string) => {
  const res =  await axios.get(`${API_URL}/${leagueChoice}/standings/${season}`);
  return res
};

export const getLeagueScoreRank = async (leagueChoice: string, season: string) => {
  const res =  await axios.get(`${API_URL}/${leagueChoice}/score/${season}`);
  return res
};

export const getLeagueTeamInfo = async (teamId:number) => {
  const res =  await axios.get(`${API_URL}/teams/${teamId}`);
  return res
};

export const getLeagueTeamSchedule = async (teamId:number) => {
  const res =  await axios.get(`${API_URL}/teams/schedule/${teamId}`);
  return res
};