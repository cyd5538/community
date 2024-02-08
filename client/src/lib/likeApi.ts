import customToast from "@/components/ui/customToast";
import axios from "axios";
import { status401Error, status402Error } from "./userApi";

const apiUrl = "http://localhost:5000/api/posts";

export const toggleLike = async (postId: string, token: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if(!token) {
    return status402Error()
  }

  try {
    const response = await axios.post(
      apiUrl + `/${postId}` + "/like",
      null,
      config
    );

    customToast("succes", response.data.message);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 400) {
          customToast("error", error.response.data.message)
        }
        if(error?.response?.status === 401) {
          status401Error()
        }
      }
    }
  }
};

export const toggleDisLike = async (postId: string, token: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if(!token) {
    return status402Error()
  }

  try {
    const response = await axios.post(
      apiUrl + `/${postId}` + "/dislike",
      null,
      config
    );

    customToast("succes", response.data.message);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 400) {
          customToast("error", error.response.data.message)
        }
        if(error?.response?.status === 401) {
          status401Error()
        }
      }
    }
  }
};
