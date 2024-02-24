import axios from "axios";

const API_URL = 'http://localhost:5000/api/rooms';

export const postRoom = async (
  title: string, 
  owner: string | undefined, 
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

export const getRooms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const deleteRoom = async (
  id: string | undefined,
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const getRoomMessages = async (
  roomId: string, 
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/${roomId}/messages`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};