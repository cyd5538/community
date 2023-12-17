import axios from 'axios';
import app from '../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const API_URL = 'http://localhost:5000/api/posts';

const imageStorage = async (file) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + file.name);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export const handlePostSubmit = async (title, description, file, token) => {
  let imageUrl = null;

  if (file) {
    imageUrl = await imageStorage(file)
  }
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const data = {
    title,
    description,
    image: imageUrl
  }

  try {
    const response = await axios.post(API_URL, data, config);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
     alert(error.response?.data.error);
    }
  }
};

export const getAllposts = async ({ pageParam }: { pageParam: number }) => {
  const res = await axios.get(`${API_URL}?page=${pageParam}`);
  return res.data;
};

export const getLikeposts = async ({ pageParam }: { pageParam: number }) => {
  const res = await axios.get(`${API_URL}/like?page=${pageParam}`);
  return res.data;
};