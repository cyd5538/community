import axios from "axios";

const API_URL = 'http://localhost:5000/api/rooms';

export const postRoom = async (
  title: string, 
  owner: string, 
  maxMembers: number, 
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const data = {
    room: title,
    owner,
    maxMembers
  }
  const response = await axios.post(API_URL, data, config);
  return response.data;
};