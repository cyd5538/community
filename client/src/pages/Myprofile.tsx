import { useEffect, useState } from 'react'
import { getMyInfo } from '../lib/api';
import axios from 'axios';

const Myprofile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchMyInfo = async () => {
      try {
        if (token) {
          const response = await getMyInfo(token);
          setUserInfo(response);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.error);
        }
      }
    };

    fetchMyInfo();
  }, []); 

  return (
    <div>
      
    </div>
  )
}

export default Myprofile
