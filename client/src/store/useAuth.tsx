import customToast from '@/components/ui/customToast';
import { login } from '@/lib/userApi';
import { create } from 'zustand'

interface AuthState {
  user: boolean;
  token: string | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => void;
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
      } catch (error) {
        set({ user: false, token: null });
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      set({ user: false, token: null });
      customToast("success", "로그아웃 ⭕")
    },
  };
});


export default useAuth;
