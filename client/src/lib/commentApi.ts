import axios from "axios";
import customToast from "@/components/ui/customToast";
import { status401Error } from "./userApi";

const apiUrl = "http://localhost:5000/api/comments";

export const handleCommentSubmit = async (
  user: string | undefined,
  post: string,
  text: string,
  token: string | null
) => {
  const data = {
    user,
    post,
    text,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(apiUrl, data, config);
    customToast("succes", response.data.message);
  } catch (error) {
    console.error(error);
  }
};

export const handleCommentDelete = async (
  postId: string,
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${apiUrl}/${postId}`, config);
  } catch (error) {
    console.log(error)
  }
};

export const handelCommentUpdate = async (
  postId: string,
  text: string,
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    text,
  };

  try {
    const response = await axios.patch(`${apiUrl}/${postId}`,data, config);
  } catch (error) {
    console.log(error)
  }
};


export const handleToggleLike = async (
  commentId: string,
  userId: string,
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    userId,
  };

  try {
    const response = await axios.post(`${apiUrl}/${commentId}/like`, data, config);
    customToast("success", response.data.message);
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

export const handleToggleDisLike = async (
  commentId: string,
  userId: string,
  token: string | null
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    userId,
  };

  try {
    const response = await axios.post(`${apiUrl}/${commentId}/dislike`, data, config);
    customToast("success", response.data.message);
  }  catch (error: unknown) {
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