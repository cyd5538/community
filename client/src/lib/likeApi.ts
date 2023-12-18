import customToast from "@/components/ui/customToast";
import axios, { AxiosError } from "axios";

const apiUrl = "http://localhost:5000/api/posts";

export const toggleLike = async (postId: string, token: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      apiUrl + `/${postId}` + "/like",
      null,
      config
    );

    customToast("succes", response.data.message);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        customToast("error", "로그인을 해주세요");
      }
    }
  }
};
