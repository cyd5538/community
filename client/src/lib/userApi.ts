import customToast from '@/components/ui/customToast'
import axios from 'axios'
import { imageStorage } from './postApi'
import { UserData } from '@/types/types'

const API_URL = 'http://localhost:5000/api/users/'

export const register = async (userData : UserData) => {
  const response = await axios.post(API_URL, userData)
  return response.data
}

export const login = async (userData: UserData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.token))
  }
  return response.data
}

export const IscheckNickname = async (nickname: string) => {
  const response = await axios.get(`${API_URL}${nickname}`)
  return response.data
}

export const getMyInfo = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'me',{}, config);
  return response.data;
};

export const profieUpdate = async (
  nickname: string | undefined,
  file: File | null,
  token: string | null
) => {
  let imageUrl = null;

  if (file) {
    imageUrl = await imageStorage(file);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    nickname,
    profileImage: file ? imageUrl : undefined,
  };

  const response = await axios.patch(API_URL + 'update', data, config);
  return response.data;
};


export const status401Error = () => {
  customToast("error", "토큰이 만료되었습니다. 다시 로그인 해주세요.")
  localStorage.removeItem('token')
  return 
}

export const status402Error = () => {
  customToast("error", "로그인이 필요합니다. 로그인해주세요.")
  return 
}
