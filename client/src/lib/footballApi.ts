import axios from "axios";

const API_URL = 'http://localhost:5000/api/football';

export const getLeagueRank = async (leagueChoice: string) => {
  const res =  await axios.get(`${API_URL}/${leagueChoice}/standings`);
  return res
};