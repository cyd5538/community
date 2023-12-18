import { useState, useEffect } from 'react';
import axios from 'axios';
import { getMyInfo } from '@/lib/userApi';
import { UserType } from '@/types/types';
import customToast from '@/components/ui/customToast';

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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          customToast('error', error.response?.data.error);
        }
      }
    };

    fetchMyInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
