import { useState, useEffect } from 'react';
import { getMyInfo } from '@/lib/userApi';
import { UserType } from '@/types/types';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await getMyInfo(token);
          setUserInfo(response);
        }
      } catch (error) {}
    };

    fetchMyInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
