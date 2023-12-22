import { useState, useEffect } from 'react';
import { getMyInfo } from '@/lib/userApi';
import { UserType } from '@/types/types';
import useAuth from '@/store/useAuth';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const { token } = useAuth()
  
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        
        if (token) {
          const response = await getMyInfo(token);
          setUserInfo(response);
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchMyInfo();
  }, [token]);

  return userInfo;
};

export default useUserInfo;
