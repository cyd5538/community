import { create } from 'zustand'
import axios from 'axios';
import { getMyInfo, login } from '@/lib/userApi';
import customToast from '@/components/ui/customToast';
import { UserType } from '@/types/types';

interface AuthState {
  user: boolean;
  token: string | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<UserType>;
}

interface UserData {
  email: string
  password: string
}

const useAuth = create<AuthState>((set) => {
  const storedToken = localStorage.getItem('token');
  const user = Boolean(storedToken);

  return {
    user,
    token: storedToken,
    login: async (userData) => {
      try {
        const response = await login(userData);
        localStorage.setItem('token', response.token);
        set({ user: true, token: response.token });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          customToast("error", error?.response?.data.error)
          set({ user: false, token: null });
        }
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      set({ user: false, token: null });
      customToast("success", "로그아웃 ⭕")
    },
    getMe: async () => {
      try {
        const response = await getMyInfo()
        return response
      } catch (error: unknown) {
        
      }
    }
  };
});


export default useAuth;
