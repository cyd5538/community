import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

export const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.token))
  }

  return response.data
}

export const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.token))
  }

  return response.data
}

export const getMyInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'me',{}, config);

  return response.data;
};

