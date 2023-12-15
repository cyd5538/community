import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/userApi';
import axios from 'axios';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      alert("로그인 완료");
      navigate('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error);
      }
      else alert('로그인 중에 에러가 발생했습니다.');
    }
  };

  return (
    <div className="w-full h-screen sm:bg-green-500 bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-96 px-4 py-4 flex flex-col gap-8 drop-shadow-md bg-white rounded-xl"
      >
        <h1 className="font-bold text-center text-2xl">Login</h1>
        <Input
          type="email"
          name="email"
          placeholder="Email을 입력해주세요."
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
        <p className="text-sm text-center">
          비회원이신가요?
          <span
            onClick={() => {
              navigate('/register');
            }}
            className="underline pl-2 cursor-pointer"
          >
            회원가입
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
