import axios from "axios";

const apiUrl = 'http://localhost:5000/api/posts';

export const toggleLike = async (postId, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.post(apiUrl + `/${postId}` + '/like', null, config);

    alert(response.data.message);
  } catch (error) {
    if(error.response.status ===  401) {
      alert("로그인을 해주세요")
    }
  }
};