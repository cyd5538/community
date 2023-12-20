import axios from "axios";
import customToast from "@/components/ui/customToast";

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

