import axios from 'axios';
import app from '../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import customToast from '@/components/ui/customToast';

const API_URL = 'http://localhost:5000/api/posts';

export const imageStorage = async (file:File) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + file.name);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

const videoStorage = async (file:File) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'videos/' + file.name);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export const handlePostSubmit = async (
  title: string,
  description: string,
  file: File | null, 
  video: File | null,
  token: string | null
) => {
  let imageUrl = null;
  let videoUrl = null;

  if (file) {
    imageUrl = await imageStorage(file)
  }
  if (video) {
    videoUrl = await videoStorage(video)
  }
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const data = {
    title,
    description,
    image: imageUrl,
    video: videoUrl
  }

  try {
    const response = await axios.post(API_URL, data, config);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      customToast('error', error.response?.data.error)
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